import { Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { Event } from '../../interfaces/event'
import { DeleteEventActions, UpdateEventActions } from '../../store/event.actions'

@Component({
  selector: 'app-event-options-menu',
  templateUrl: './event-options-menu.component.html',
  styleUrls: ['./event-options-menu.component.scss']
})
export class EventOptionsMenuComponent {
  @Input() event: Event

  constructor(private store: Store) {}

  updateEvent(): void {
    this.store.dispatch(UpdateEventActions.openUpdateEventDialog({ eventId: this.event.id }))
  }

  deleteEvent(): void {
    this.store.dispatch(DeleteEventActions.deleteEvent({ eventId: this.event.id }))
  }
}
