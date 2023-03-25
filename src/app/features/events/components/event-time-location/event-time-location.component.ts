import { Component, Input } from '@angular/core'
import { Event } from '../../interfaces/event'

@Component({
  selector: 'app-event-time-location',
  templateUrl: './event-time-location.component.html',
  styleUrls: ['./event-time-location.component.scss']
})
export class EventTimeLocationComponent {
  @Input() event: Event
}
