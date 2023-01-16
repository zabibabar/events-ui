import { Component } from '@angular/core'
import { OverlayContainer } from '@angular/cdk/overlay'
import { NavList } from '../../types/nav-List'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  themeColor: 'primary' | 'accent' | 'warn' = 'primary'
  isDark = false
  navList: NavList[] = [
    { icon: 'home', label: 'Home' },
    { icon: 'event', label: 'Events' },
    { icon: 'groups', label: 'Groups' },
    { icon: 'chat', label: 'Messages' }
  ]

  constructor(private overlayContainer: OverlayContainer) {}

  toggleTheme(): void {
    this.isDark = !this.isDark
    if (this.isDark) {
      this.overlayContainer.getContainerElement().classList.add('dark-theme')
    } else {
      this.overlayContainer.getContainerElement().classList.remove('dark-theme')
    }
  }
}
