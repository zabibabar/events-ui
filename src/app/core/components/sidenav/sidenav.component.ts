import { Component } from '@angular/core'
import { NavLink } from '../../types/nav-link'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  navList: NavLink[] = [
    { icon: 'home', label: 'Home', link: '/' },
    { icon: 'event', label: 'Events', link: '/events' },
    { icon: 'groups', label: 'Groups', link: '/groups' },
    { icon: 'chat', label: 'Messages', link: '/messages' }
  ]
}
