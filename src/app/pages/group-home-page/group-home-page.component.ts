import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Event } from 'src/app/features/events/interfaces/event'
import {
  selectPastEventsByCurrentGroup,
  selectUpcomingEventsByCurrentGroup
} from 'src/app/features/events/store/event.selectors'

@Component({
  selector: 'app-group-home-page',
  templateUrl: './group-home-page.component.html',
  styleUrls: ['./group-home-page.component.scss']
})
export class GroupHomePageComponent {
  pastEvents$: Observable<Event[]> = this.store.select(selectPastEventsByCurrentGroup({ limit: 1 }))
  upcomingEvents$: Observable<Event[]> = this.store.select(selectUpcomingEventsByCurrentGroup({ limit: 4 }))

  constructor(private store: Store) {}
}
