import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, map } from 'rxjs'
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
  pastEvents$: Observable<Event[]> = this.store.select(selectPastEventsByCurrentGroup({ limit: 1 }))
  upcomingEvents$: Observable<Event[]> = this.store.select(selectUpcomingEventsByCurrentGroup({ limit: 3 }))
  groupMembers$: Observable<Member[]> = this.store.select(selectMembersForCurrentGroup)
  groupOrganizers$: Observable<Member[]> = this.store.select(selectOrganizersForCurrentGroup)
  upcomingEventCount$: Observable<number | undefined> = this.store.select(selectUpcomingEventCountForCurrentGroup)
  pastEventCount$: Observable<number | undefined> = this.store.select(selectPastEventCountForCurrentGroup)
  isDesktop$: Observable<boolean>

  constructor(private store: Store, breakpoint: BreakpointObserver) {
    this.isDesktop$ = breakpoint
      .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .pipe(map(({ matches }) => matches))
  }
}
