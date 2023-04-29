import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { FetchUpcomingEventsActions } from 'src/app/features/events/store/event.actions'

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(FetchUpcomingEventsActions.fetchUpcomingEvents())
  }
}
