import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectCurrentUser } from 'src/app/features/users/store/user/user.selectors'
import { NavLink } from '../../types/nav-link'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  navList: NavLink[] = [
    { icon: 'home', label: 'Home', link: '/' },
    { icon: 'groups', label: 'Groups', link: '/groups' }
    // { icon: 'event', label: 'Events', link: '/events' }
  ]
  user$ = this.store.select(selectCurrentUser)

  constructor(private readonly store: Store) {}
}
