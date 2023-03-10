import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import {
  DialogFormBodyDirective,
  DialogFormComponent,
  DialogFormFooterDirective,
  DialogFormTitleDirective
} from './dialog-form'
import { MatDividerModule } from '@angular/material/divider'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog'

@NgModule({
  declarations: [DialogFormComponent, DialogFormBodyDirective, DialogFormTitleDirective, DialogFormFooterDirective],
  imports: [CommonModule, MatDividerModule, MatButtonModule, MatIconModule, MatDialogModule],
  exports: [DialogFormComponent, DialogFormBodyDirective, DialogFormTitleDirective, DialogFormFooterDirective],
  providers: []
})
export class DialogFormModule {}
