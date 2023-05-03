import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Attendee } from '../../interfaces/attendee'
import {
  selectGoingAttendeesForCurrentEvent,
  selectNotGoingAttendeesForCurrentEvent,
  selectGoingAttendeesCountForCurrentEvent,
  selectNotGoingAttendeesCountForCurrentEvent
} from '../../store/event.selectors'

@Component({
  selector: 'app-event-attendee-list',
  templateUrl: './event-attendee-list.component.html',
  styleUrls: ['./event-attendee-list.component.scss']
})
export class EventAttendeeListComponent {
  goingAttendeeList$: Observable<Attendee[]> = this.store.select(selectGoingAttendeesForCurrentEvent)
  notGoingAttendeeList$: Observable<Attendee[]> = this.store.select(selectNotGoingAttendeesForCurrentEvent)
  goingAttendeeCount$: Observable<number> = this.store.select(selectGoingAttendeesCountForCurrentEvent)
  notGoingAttendeeCount$: Observable<number> = this.store.select(selectNotGoingAttendeesCountForCurrentEvent)

  constructor(private store: Store) {}
}
