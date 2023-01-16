import { Component } from '@angular/core'
import { NavList } from '../../types/nav-List'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  navList: NavList[] = [
    { icon: 'home', label: 'Home' },
    { icon: 'event', label: 'Events' },
    { icon: 'groups', label: 'Groups' },
    { icon: 'chat', label: 'Messages' }
  ]
}
