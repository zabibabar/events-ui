import { Component, OnInit } from '@angular/core'
import { Toast } from 'ngx-toastr'

@Component({
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  preserveWhitespaces: false
})
export class ToastComponent extends Toast implements OnInit {
  toastType = ''

  ngOnInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;[, this.toastType] = this.toastPackage.toastType.split('-')
  }
}
