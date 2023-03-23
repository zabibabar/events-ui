import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { NgxFileDropModule } from 'ngx-file-drop'
import { ImageCropperModule } from 'ngx-image-cropper'
import { DialogFormModule } from '../dialog-form/dialog-form.module'
import { UploadImageComponent } from './upload-image'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@NgModule({
  declarations: [UploadImageComponent],
  imports: [
    MatDialogModule,
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    DialogFormModule,
    NgxFileDropModule,
    ImageCropperModule,
    MatProgressSpinnerModule
  ]
})
export class UploadImageModule {}
