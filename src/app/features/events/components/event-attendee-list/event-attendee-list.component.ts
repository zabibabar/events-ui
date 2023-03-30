import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Attendee } from '../../interfaces/attendee'
import {
  selectGoingAttendeesForCurrentEvent,
  selectNotGoingAttendeesForCurrentEvent,
  selectGoingAttendeesCountForCurrentEvent
} from '../../store/event.selectors'

@Component({
  selector: 'app-event-attendee-list',
  templateUrl: './event-attendee-list.component.html',
  styleUrls: ['./event-attendee-list.component.scss']
})
export class EventAttendeeListComponent {
  goingAttendeeList$: Observable<Attendee[]> = this.store.select(selectGoingAttendeesForCurrentEvent)
  // .pipe(map((a) => Array.from({ length: 9 }, () => a[0])))
  notGoingAttendeeList$: Observable<Attendee[]> = this.store.select(selectNotGoingAttendeesForCurrentEvent)
  attendeeCount$: Observable<number> = this.store.select(selectGoingAttendeesCountForCurrentEvent)

  constructor(private store: Store) {}
}
