import { Component, Input } from '@angular/core'
import { Event } from '../../interfaces/event'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  @Input() event: Event
}
