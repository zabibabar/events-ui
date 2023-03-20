import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { DialogConfirmationComponent } from './dialog-confirmation'

@NgModule({
  declarations: [DialogConfirmationComponent],
  imports: [MatDialogModule, CommonModule, MatDividerModule, MatButtonModule, MatIconModule]
})
export class DialogConfirmationModule {}
