import { Component, Input, OnChanges } from '@angular/core'
import { User } from '../../interfaces/user'

@Component({
  selector: 'app-user-avatar-group',
  templateUrl: './user-avatar-group.component.html',
  styleUrls: ['./user-avatar-group.component.scss']
})
export class UserAvatarGroupComponent implements OnChanges {
  @Input() users: { user?: User }[] = []
  @Input() max = 3
  @Input() appearance: 'stack' | 'grid' = 'stack'
  visibleUsers: User[] = []
  moreUserCount = 0

  ngOnChanges(): void {
    this.visibleUsers = this.users.slice(0, this.max).map(({ user }) => user as User)
    this.moreUserCount = Math.max(0, this.users.length - this.max)
  }
}
