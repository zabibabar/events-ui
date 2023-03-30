import { Component, Input } from '@angular/core'
import { Attendee } from '../../interfaces/attendee'

@Component({
  selector: 'app-event-attendee-list-item',
  templateUrl: './event-attendee-list-item.component.html',
  styleUrls: ['./event-attendee-list-item.component.scss']
})
export class EventAttendeeListItemComponent {
  @Input() attendee: Attendee
}
