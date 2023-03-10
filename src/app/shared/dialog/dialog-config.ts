import { MatDialogConfig } from '@angular/material/dialog'
import { DialogType } from './dialog-type.enum'

export interface DialogConfig<D> extends MatDialogConfig<D> {
  type: DialogType
}
