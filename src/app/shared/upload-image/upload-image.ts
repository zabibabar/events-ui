import { Component, Inject, ViewChild } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { NgxFileDropEntry } from 'ngx-file-drop'
import { NgxImageCompressService, DOC_ORIENTATION } from 'ngx-image-compress'
import { ImageCropperComponent } from 'ngx-image-cropper'
import { from, Observable, switchMap, take, tap } from 'rxjs'
import { UploadImageData } from './upload-image-data'

@Component({
  selector: 'upload-image',
  templateUrl: './upload-image.html',
  styleUrls: ['./upload-image.scss']
})
export class UploadImageComponent {
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent
  uploadedFile$: Observable<File>
  isUploading = false

  constructor(@Inject(MAT_DIALOG_DATA) public data: UploadImageData, private imageCompress: NgxImageCompressService) {}

  dropped(files: NgxFileDropEntry[]) {
    this.isUploading = true
    const [droppedFile] = files
    if (!droppedFile.fileEntry.isFile) return

    const fileEntry = droppedFile.fileEntry as FileSystemFileEntry
    fileEntry.file((file: File) => {
      this.uploadedFile$ = this.compressImage(file).pipe(
        tap(() => {
          this.isUploading = false
        })
      )
    })
  }

  submit(): void {
    this.base64ToFile(this.imageCropper.crop()?.base64 as string)
      .pipe(take(1))
      .subscribe((image) => this.data.uploadAction(image))
  }

  private convertFileToBase64(file: File): Observable<string> {
    return new Observable<string>((subscribe) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        subscribe.next(reader.result as string)
        subscribe.complete()
      }
    })
  }

  private compressImage(file: File): Observable<File> {
    return this.convertFileToBase64(file).pipe(
      switchMap((base64String) =>
        this.imageCompress.compressFile(base64String, DOC_ORIENTATION.Up, 100, 50, this.data.minWidth * 2)
      ),
      switchMap((base64String) => this.base64ToFile(base64String))
    )
  }

  private base64ToFile(base64String: string): Observable<File> {
    return from(
      fetch(base64String)
        .then((res) => res.arrayBuffer())
        .then((buf) => new File([buf], this.data.fileName, { type: 'image/png' }))
    )
  }
}
