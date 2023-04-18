import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { NavLink } from 'src/app/core/types/nav-link'
import { selectCurrentGroup, selectIsCurrentGroupMemberOrganizer } from 'src/app/features/groups/store/group.selectors'
import { selectCurrentEvent, selectGoingAttendeesForCurrentEvent } from '../../store/event.selectors'
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout'
import { map } from 'rxjs'

@Component({
  selector: 'app-event-header',
  templateUrl: './event-header.component.html',
  styleUrls: ['./event-header.component.scss']
})
export class EventHeaderComponent {
  links: NavLink[] = [
    { label: 'Details', link: 'home' },
    { label: 'Attendees', link: 'attendees' }
  ]

  event$ = this.store.select(selectCurrentEvent)
  group$ = this.store.select(selectCurrentGroup)
  goingAttendees$ = this.store.select(selectGoingAttendeesForCurrentEvent)
  isCurrentGroupMemberOrganizer$ = this.store.select(selectIsCurrentGroupMemberOrganizer)
  isDesktop$ = this.breakpoints
    .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .pipe(map(({ matches }) => matches))

  constructor(private store: Store, private breakpoints: BreakpointObserver) {}
}
