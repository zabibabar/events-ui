import { Component, Input } from '@angular/core'
import { Event } from '../../interfaces/event'

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {
  @Input() events: Event[] = []

  eventTrackBy(_: number, event: Event) {
    return event.id
  }
}
