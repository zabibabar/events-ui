import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectOrganizersForCurrentEvent } from '../../store/event.selectors'

@Component({
  selector: 'app-event-organizer-card',
  templateUrl: './event-organizer-card.component.html',
  styleUrls: ['./event-organizer-card.component.scss']
})
export class EventOrganizerCardComponent {
  organizers$ = this.store.select(selectOrganizersForCurrentEvent)

  constructor(private store: Store) {}
}
