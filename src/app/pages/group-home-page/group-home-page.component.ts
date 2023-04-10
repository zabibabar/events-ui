import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
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
  selectOrganizersForCurrentGroup
} from 'src/app/features/groups/store/group.selectors'

@Component({
  selector: 'app-group-home-page',
  templateUrl: './group-home-page.component.html',
  styleUrls: ['./group-home-page.component.scss']
})
export class GroupHomePageComponent {
  currentGroup$: Observable<Group | undefined> = this.store.select(selectCurrentGroup)
  pastEvents$: Observable<Event[]> = this.store.select(selectPastEventsByCurrentGroup({ limit: 1 }))
  upcomingEvents$: Observable<Event[]> = this.store.select(selectUpcomingEventsByCurrentGroup({ limit: 4 }))
  groupMembers$: Observable<Member[]> = this.store.select(selectMembersForCurrentGroup)
  groupOrganizers$: Observable<Member[]> = this.store.select(selectOrganizersForCurrentGroup)

  constructor(private store: Store) {}
}
