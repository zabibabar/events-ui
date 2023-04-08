import { Component, Input } from '@angular/core'

@Component({
  selector: 'loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {
  @Input() diameter = 18
  @Input() disabled = false
}
