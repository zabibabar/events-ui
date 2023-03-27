import { ComponentType } from '@angular/cdk/portal'
import { Injectable } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { DialogConfig } from './dialog-config'
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation'
import { DialogConfirmationData } from '../dialog-confirmation/dialog-confirmation-data'
import { DialogType } from './dialog-type.enum'
import { UploadImageComponent } from '../upload-image/upload-image'
import { UploadImageData } from '../upload-image/upload-image-data'
import { DialogFormData } from '../dialog-form/dialog-form-data'

const DialogWidth: Record<DialogType, string> = {
  [DialogType.CONFIRMATION]: '400px',
  [DialogType.FORM]: '720px'
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  open<T, D = unknown, R = unknown>(component: ComponentType<T>, config: DialogConfig<D>): MatDialogRef<T, R> {
    return this.dialog.open(component, {
      width: DialogWidth[config.type],
      autoFocus: false,
      disableClose: true,
      ...config
    })
  }

  openForm<T, D extends DialogFormData, R = unknown>(
    component: ComponentType<T>,
    config: DialogConfig<D>
  ): MatDialogRef<T, R> {
    return this.open<T, D, R>(component, {
      ...config,
      type: DialogType.FORM
    })
  }

  openConfirmationDialog(data: DialogConfirmationData): MatDialogRef<DialogConfirmationComponent, boolean> {
    return this.open<DialogConfirmationComponent, DialogConfirmationData, boolean>(DialogConfirmationComponent, {
      type: DialogType.CONFIRMATION,
      data: {
        ...data,
        secondaryCTA: data.secondaryCTA ?? 'Cancel'
      }
    })
  }

  openUploadImage(data: UploadImageData): MatDialogRef<UploadImageComponent, File> {
    return this.open<UploadImageComponent, UploadImageData, File>(UploadImageComponent, {
      type: DialogType.FORM,
      data
    })
  }
}
