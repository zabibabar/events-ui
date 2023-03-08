import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { FetchAllEventsActions } from 'src/app/features/events/store/event.actions'

@Component({
  selector: 'app-event-details-page',
  templateUrl: './event-details-page.component.html',
  styleUrls: ['./event-details-page.component.scss']
})
export class EventDetailsPageComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(FetchAllEventsActions.fetchAllEvents())
  }
}
