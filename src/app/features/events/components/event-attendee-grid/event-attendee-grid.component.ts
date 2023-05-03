import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { map, Observable } from 'rxjs'
import { Attendee } from '../../interfaces/attendee'
import { selectGoingAttendeesForCurrentEvent } from '../../store/event.selectors'

@Component({
  selector: 'app-event-attendee-grid',
  templateUrl: './event-attendee-grid.component.html',
  styleUrls: ['./event-attendee-grid.component.scss']
})
export class EventAttendeeGridComponent {
  private readonly max = 8
  goingAttendees$: Observable<Attendee[]> = this.store.select(selectGoingAttendeesForCurrentEvent)

  visibleAttendees$: Observable<Attendee[]> = this.goingAttendees$.pipe(map((a) => a.slice(0, this.max)))

  constructor(private store: Store) {}
}
