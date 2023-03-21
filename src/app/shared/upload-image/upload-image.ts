import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { NgxFileDropEntry } from 'ngx-file-drop'
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper'
import { UploadImageData } from './upload-image-data'

@Component({
  selector: 'upload-image',
  templateUrl: './upload-image.html',
  styleUrls: ['./upload-image.scss']
})
export class UploadImageComponent {
  uploadedFile: File
  croppedImage = ''
  transform: ImageTransform = { scale: 1 }

  constructor(
    private dialogRef: MatDialogRef<UploadImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UploadImageData
  ) {}

  dropped(files: NgxFileDropEntry[]) {
    const [droppedFile] = files
    if (!droppedFile.fileEntry.isFile) return

    const fileEntry = droppedFile.fileEntry as FileSystemFileEntry
    fileEntry.file((file: File) => {
      this.uploadedFile = file
    })
  }

  imageCropped(event: ImageCroppedEvent) {
    if (typeof event.base64 !== 'string') return
    this.croppedImage = event.base64
  }

  submit(): void {
    this.dialogRef.close(this.croppedImage)
  }
}
