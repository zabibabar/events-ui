import { Component, Inject, ViewEncapsulation } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DialogConfirmationData } from './dialog-confirmation-data'

@Component({
  selector: 'dialog-confirmation',
  templateUrl: './dialog-confirmation.html',
  styleUrls: ['./dialog-confirmation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogConfirmationData
  ) {}
}
