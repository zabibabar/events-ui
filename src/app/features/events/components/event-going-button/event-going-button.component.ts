import { Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { debounceTime, distinctUntilChanged, of, Subject, switchMap } from 'rxjs'
import { Event } from '../../interfaces/event'
import { UpdateEventAttendeeActions } from '../../store/event.actions'
import { selectCurrentAttendee } from '../../store/event.selectors'

@Component({
  selector: 'app-event-going-button',
  templateUrl: './event-going-button.component.html',
  styleUrls: ['./event-going-button.component.scss']
})
export class EventGoingButtonComponent {
  @Input() event: Event

  attendee$ = this.store.select(selectCurrentAttendee)
  isGoingChanged$ = new Subject<boolean>()

  constructor(private store: Store) {
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
