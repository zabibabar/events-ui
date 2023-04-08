import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Attendee } from '../../interfaces/attendee'
import { Event } from '../../interfaces/event'
import { AddEventAttendeeActions, UpdateEventAttendeeActions } from '../../store/event.actions'
import { selectCurrentUserAsEventAttendee } from '../../store/event.selectors'
import { selectCurrentUserId } from 'src/app/features/users/store/user/user.selectors'

@Component({
  selector: 'app-event-going-button',
  templateUrl: './event-going-button.component.html',
  styleUrls: ['./event-going-button.component.scss']
})
export class EventGoingButtonComponent implements OnInit {
  @Input() event: Event

  hasEventPassed: boolean
  attendee$: Observable<Attendee | undefined>
  currentUserId: Observable<string | null> = this.store.select(selectCurrentUserId)

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.hasEventPassed = Date.now() > new Date(this.event.timeEnd).getTime()
    this.attendee$ = this.store.select(selectCurrentUserAsEventAttendee({ eventId: this.event.id }))
  }

  attendEvent(userId: string): void {
    this.store.dispatch(
      AddEventAttendeeActions.addEventAttendee({
        eventId: this.event.id,
        userId
      })
    )
  }

  changeGoingStatus(attendeeId: string, isGoing: boolean): void {
    this.store.dispatch(
      UpdateEventAttendeeActions.updateEventAttendee({
        eventId: this.event.id,
        attendeeId: attendeeId,
        changes: { isGoing }
      })
    )
  }
}
