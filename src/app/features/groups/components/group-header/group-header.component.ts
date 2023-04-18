import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { NavLink } from 'src/app/core/types/nav-link'
import { selectCurrentGroup, selectIsCurrentGroupMemberOrganizer } from '../../store/group.selectors'
import { Member } from '../../interfaces/member'
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout'
import { map } from 'rxjs'
import { CreateEventActions } from 'src/app/features/events/store/event.actions'

@Component({
  selector: 'app-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.scss']
})
export class GroupHeaderComponent {
  links: NavLink[] = [
    { label: 'Details', link: 'home' },
    { label: 'Events', link: 'events' },
    { label: 'Members', link: 'members' }
  ]

  group$ = this.store.select(selectCurrentGroup)
  isCurrentGroupMemberOrganizer$ = this.store.select(selectIsCurrentGroupMemberOrganizer)
  isMobile$ = this.breakpoints.observe(Breakpoints.XSmall).pipe(map(({ matches }) => matches))

  constructor(private store: Store, private breakpoints: BreakpointObserver) {}

  createEvent(): void {
    this.store.dispatch(CreateEventActions.openCreateEventDialog())
  }

  duplicateMembers(members: Member[]): Member[] {
    return Array.from({ length: 10 }, () => members[0])
  }
}
