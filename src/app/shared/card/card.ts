import { Component, Directive, HostBinding, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'card, [card]',
  templateUrl: './card.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./card.scss']
})
export class CardComponent {
  @HostBinding('class') classes = 'card'
}

@Directive({
  selector: 'card-header, [card-header]'
})
export class CardHeaderDirective {
  @HostBinding('class') classes = 'card__header'
}
