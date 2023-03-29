import { Component, Input, OnInit } from '@angular/core'
import { UserEmbedded } from '../../interfaces/user-embedded'

@Component({
  selector: 'app-user-avatar-group',
  templateUrl: './user-avatar-group.component.html',
  styleUrls: ['./user-avatar-group.component.scss']
})
export class UserAvatarGroupComponent implements OnInit {
  @Input() users: { user?: UserEmbedded }[] = []
  @Input() max = 3
  @Input() appearance: 'stack' | 'grid' = 'stack'
  visibleUsers: UserEmbedded[] = []
  moreUserCount = 0

  ngOnInit(): void {
    this.visibleUsers = this.users.slice(0, this.max).map(({ user }) => user as UserEmbedded)
    this.moreUserCount = Math.max(0, this.users.length - this.max)
  }
}
