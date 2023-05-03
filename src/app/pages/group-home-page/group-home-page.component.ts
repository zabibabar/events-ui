import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, map } from 'rxjs'
import * as EventLimits from 'src/app/features/events/constants/event-limits'
import { Event } from 'src/app/features/events/interfaces/event'
import {
  selectPastEventsByCurrentGroup,
  selectUpcomingEventsByCurrentGroup
} from 'src/app/features/events/store/event.selectors'
import { Group } from 'src/app/features/groups/interfaces/group'
import { Member } from 'src/app/features/groups/interfaces/member'
import {
  selectCurrentGroup,
  selectMembersForCurrentGroup,
  selectOrganizersForCurrentGroup,
  selectPastEventCountForCurrentGroup,
  selectUpcomingEventCountForCurrentGroup
} from 'src/app/features/groups/store/group.selectors'

@Component({
  selector: 'app-group-home-page',
  templateUrl: './group-home-page.component.html',
  styleUrls: ['./group-home-page.component.scss']
})
export class GroupHomePageComponent {
  currentGroup$: Observable<Group | undefined> = this.store.select(selectCurrentGroup)
  pastEvents$: Observable<Event[]> = this.store.select(
    selectPastEventsByCurrentGroup({ limit: EventLimits.PAST_EVENTS_INITIAL_LOAD_FOR_CURRENT_GROUP })
  )
  upcomingEvents$: Observable<Event[]> = this.store.select(
    selectUpcomingEventsByCurrentGroup({ limit: EventLimits.UPCOMING_EVENTS_INITIAL_LOAD_FOR_CURRENT_GROUP })
  )
  groupMembers$: Observable<Member[]> = this.store.select(selectMembersForCurrentGroup)
  groupOrganizers$: Observable<Member[]> = this.store.select(selectOrganizersForCurrentGroup)
  upcomingEventCount$: Observable<number | undefined> = this.store.select(selectUpcomingEventCountForCurrentGroup)
  pastEventCount$: Observable<number | undefined> = this.store.select(selectPastEventCountForCurrentGroup)
  isDesktop$ = this.breakpoints
    .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .pipe(map(({ matches }) => matches))

  constructor(private store: Store, private breakpoints: BreakpointObserver) {}
}
