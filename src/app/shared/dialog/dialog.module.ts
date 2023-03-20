import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation'
import { UploadFileComponent } from '../upload-file/upload-file'
import { DialogService } from './dialog.service'

@NgModule({
  declarations: [DialogConfirmationComponent, UploadFileComponent],
  imports: [MatDialogModule, CommonModule, MatDividerModule, MatButtonModule, MatIconModule],
  providers: [DialogService]
})
export class DialogModule {}
