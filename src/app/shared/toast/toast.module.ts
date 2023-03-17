import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { ToastrModule } from 'ngx-toastr'

import { ToastComponent } from './toast.component'

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ToastrModule.forRoot({ timeOut: 100000, toastComponent: ToastComponent, toastClass: 'toast', tapToDismiss: false })
  ],
  declarations: [ToastComponent]
})
export class ToastModule {}
