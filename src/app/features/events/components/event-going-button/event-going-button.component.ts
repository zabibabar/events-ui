import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap } from 'rxjs'
import { Attendee } from '../../interfaces/attendee'
import { Event } from '../../interfaces/event'
import { UpdateEventAttendeeActions } from '../../store/event.actions'
import { selectCurrentUserAsEventAttendee } from '../../store/event.selectors'

@Component({
  selector: 'app-event-going-button',
  templateUrl: './event-going-button.component.html',
  styleUrls: ['./event-going-button.component.scss']
})
export class EventGoingButtonComponent implements OnInit {
  @Input() event: Event

  attendee$: Observable<Attendee | undefined>
  isGoingChanged$ = new Subject<boolean>()

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.attendee$ = this.store.select(selectCurrentUserAsEventAttendee({ eventId: this.event.id }))
    this.isGoingChanged$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((isGoing) => of(isGoing))
      )
      .subscribe((isGoing) => {
        this.store.dispatch(
          UpdateEventAttendeeActions.updateEventAttendee({ eventId: this.event.id, attendee: { isGoing } })
        )
      })
  }
}
