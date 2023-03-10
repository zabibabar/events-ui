import { ComponentType } from '@angular/cdk/portal'
import { Injectable } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { DialogConfig } from './dialog-config'
import { DialogType } from './dialog-type.enum'

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
      width: DialogWidth[config?.type],
      disableClose: true,
      ...config
    })
  }
}
