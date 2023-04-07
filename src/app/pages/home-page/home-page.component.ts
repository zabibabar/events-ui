import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { FetchAllEventsActions } from 'src/app/features/events/store/event.actions'
import { selectUpcomingEventsByCurrentUser } from 'src/app/features/events/store/event.selectors'
import { FetchAllGroupsActions } from 'src/app/features/groups/store/group.actions'

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  events$ = this.store.select(selectUpcomingEventsByCurrentUser({ limit: 4 }))

  constructor(private store: Store) {
    // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(FetchAllGroupsActions.fetchAllGroups({ filterOptions: { limit: 4 } }))
    // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(FetchAllEventsActions.fetchAllEvents({ filterOptions: { upcomingLimit: 4 } }))
  }
}
