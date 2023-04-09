import { Component, Input, ViewChild } from '@angular/core'
import { MatMenu } from '@angular/material/menu'
import { Store } from '@ngrx/store'
import { DialogService } from 'src/app/shared/dialog/dialog.service'
import { Group } from '../../interfaces/group'
import { RemoveGroupMemberActions } from '../../store/group.actions'
import { selectCurrentUserId } from 'src/app/features/users/store/user/user.selectors'

@Component({
  selector: 'app-group-options-menu',
  templateUrl: './group-options-menu.component.html',
  styleUrls: ['./group-options-menu.component.scss'],
  exportAs: 'groupOptionsMenu'
})
export class GroupOptionsMenuComponent {
  @ViewChild(MatMenu, { static: true }) menu: MatMenu
  @Input() group: Group

  userId$ = this.store.select(selectCurrentUserId)

  constructor(private store: Store, private dialog: DialogService) {}

  copyInviteLink(): void {
    navigator.clipboard.writeText(`${location.origin}/groups/join?inviteCode=${this.group.inviteCode}`)
  }

  leaveGroup(userId: string): void {
    this.store.dispatch(RemoveGroupMemberActions.removeGroupMember({ userId }))
  }
}
