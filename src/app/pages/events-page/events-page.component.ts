import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { FetchNextUpcomingEventsActions, FetchUpcomingEventsActions } from 'src/app/features/events/store/event.actions'
import {
  selectHasMoreUpcomingEvents,
  selectUpcomingEventsByCurrentUser
} from 'src/app/features/events/store/event.selectors'

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {
  events$ = this.store.select(selectUpcomingEventsByCurrentUser({ isGoing: true }))
  hasMoreEvents$ = this.store.select(selectHasMoreUpcomingEvents)

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(FetchUpcomingEventsActions.fetchUpcomingEvents())
  }

  fetchNextEvents(): void {
    this.store.dispatch(FetchNextUpcomingEventsActions.fetchNextUpcomingEvents())
  }
}
