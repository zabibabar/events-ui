import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { DialogConfirmationModule } from '../dialog-confirmation/dialog-confirmation.module'
import { DialogService } from './dialog.service'

@NgModule({
  imports: [DialogConfirmationModule, MatDialogModule, CommonModule, MatDividerModule, MatButtonModule, MatIconModule],
  providers: [DialogService]
})
export class DialogModule {}
