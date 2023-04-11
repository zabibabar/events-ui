import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { DialogConfirmationComponent } from './dialog-confirmation'
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module'

@NgModule({
  declarations: [DialogConfirmationComponent],
  imports: [MatDialogModule, CommonModule, MatDividerModule, MatButtonModule, MatIconModule, LoadingSpinnerModule]
})
export class DialogConfirmationModule {}
