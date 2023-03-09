import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { NavLink } from 'src/app/core/types/nav-link'
import { selectCurrentGroup } from '../../store/group.selectors'

@Component({
  selector: 'app-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.scss']
})
export class GroupHeaderComponent {
  links: NavLink[] = [
    { label: 'About', link: 'home' },
    { label: 'Events', link: 'events' },
    { label: 'Members', link: 'members' },
    { label: 'Photos', link: 'photos' }
  ]
  activeLink = this.links[0]

  group$ = this.store.select(selectCurrentGroup)

  constructor(private store: Store) {}
}
