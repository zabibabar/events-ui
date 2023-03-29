import { Component, Directive, HostBinding, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'card',
  templateUrl: './card.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./card.scss']
})
export class CardComponent {}

@Directive({
  selector: 'card-header, [card-header]'
})
export class CardHeaderDirective {
  @HostBinding('class') classes = 'card__header'
}
