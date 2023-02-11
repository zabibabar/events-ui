import { Component } from '@angular/core'
import { NavList } from '../../types/nav-list'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  navList: NavList[] = [
    { icon: 'home', label: 'Home', link: '/' },
    { icon: 'event', label: 'Events', link: '/events' },
    { icon: 'groups', label: 'Groups', link: '/groups' },
    { icon: 'chat', label: 'Messages', link: '/messages' }
  ]
}
