import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { NavLink } from 'src/app/core/types/nav-link'
import { selectCurrentGroup, selectIsCurrentGroupMemberOrganizer } from 'src/app/features/groups/store/group.selectors'
import { selectCurrentEvent, selectCurrentEventGoingAttendeesCount } from '../../store/event.selectors'

@Component({
  selector: 'app-event-header',
  templateUrl: './event-header.component.html',
  styleUrls: ['./event-header.component.scss']
})
export class EventHeaderComponent {
  links: NavLink[] = [
    { label: 'Home', link: 'home' },
    { label: 'Attendees', link: 'attendees' },
    { label: 'Photos', link: 'photos' }
  ]

  event$ = this.store.select(selectCurrentEvent)
  group$ = this.store.select(selectCurrentGroup)
  attendeeCount$ = this.store.select(selectCurrentEventGoingAttendeesCount)
  isCurrentGroupMemberOrganizer$ = this.store.select(selectIsCurrentGroupMemberOrganizer)

  constructor(private store: Store) {}
}
