import { Component, Directive, HostBinding, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'app-section',
  templateUrl: './section.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./section.scss']
})
export class SectionComponent {}

@Directive({
  selector: 'app-section-header, [app-section-header]'
})
export class SectionHeaderDirective {
  @HostBinding('class') classes = 'section__header'
}
