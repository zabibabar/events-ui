import { Component, Directive, HostBinding, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'dialog-form',
  templateUrl: './dialog-form.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dialog-form.scss']
})
export class DialogFormComponent {}

@Directive({
  selector: 'dialog-form-title, [dialog-form-title]'
})
export class DialogFormTitleDirective {
  @HostBinding('class') classes = 'dialog-form__header__title mat-subtitle-1'
}

@Directive({
  selector: 'dialog-form-body, [dialog-form-body]'
})
export class DialogFormBodyDirective {
  @HostBinding('class') classes = 'dialog-form__body'
}

@Directive({
  selector: 'dialog-form-footer, [dialog-form-footer]'
})
export class DialogFormFooterDirective {
  @HostBinding('class') classes = 'dialog-form__footer'
}
