import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { HomePageLoaded } from 'src/app/core/store/app.actions'
import * as EventLimits from 'src/app/features/events/constants/event-limits'
import { selectUpcomingEventsByCurrentUser } from 'src/app/features/events/store/event.selectors'
import * as GroupLimits from 'src/app/features/groups/constants/group-limits'
import { selectGroups } from 'src/app/features/groups/store/group.selectors'

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  groups$ = this.store.select(selectGroups({ limit: GroupLimits.GROUPS_FOR_CURRENT_USER }))
  events$ = this.store.select(
    selectUpcomingEventsByCurrentUser({ limit: EventLimits.UPCOMING_EVENTS_FOR_CURRENT_USER, isGoing: true })
  )

  constructor(private store: Store) {
    this.store.dispatch(HomePageLoaded())
  }
}
