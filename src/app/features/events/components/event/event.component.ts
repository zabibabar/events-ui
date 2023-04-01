import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Attendee } from '../../interfaces/attendee'
import { Event } from '../../interfaces/event'
import { selectCurrentUserAsEventAttendee, selectGoingAttendeesForEvent } from '../../store/event.selectors'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @Input() event: Event

  attendees$: Observable<Attendee[]>
  currentUserAsAttendee$: Observable<Attendee | undefined>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.currentUserAsAttendee$ = this.store.select(selectCurrentUserAsEventAttendee({ eventId: this.event.id }))
    this.attendees$ = this.store.select(selectGoingAttendeesForEvent({ eventId: this.event.id }))
  }
}
