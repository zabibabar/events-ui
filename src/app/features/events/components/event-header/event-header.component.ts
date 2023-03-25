import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { NavLink } from 'src/app/core/types/nav-link'
import { selectCurrentGroup } from 'src/app/features/groups/store/group.selectors'
import { selectCurrentEvent } from '../../store/event.selectors'

@Component({
  selector: 'app-event-header',
  templateUrl: './event-header.component.html',
  styleUrls: ['./event-header.component.scss']
})
export class EventHeaderComponent {
  links: NavLink[] = [
    { label: 'Home', link: 'home' },
    { label: 'Attendees', link: 'attendees' },
    { label: 'Tasks', link: 'tasks' }
  ]

  event$ = this.store.select(selectCurrentEvent)
  group$ = this.store.select(selectCurrentGroup)

  constructor(private store: Store) {}
}
