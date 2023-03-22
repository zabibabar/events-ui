import { Component, Input, ViewChild } from '@angular/core'
import { MatMenu } from '@angular/material/menu'
import { Store } from '@ngrx/store'
import { DialogService } from 'src/app/shared/dialog/dialog.service'
import { Group } from '../../interfaces/group'
import { DeleteGroupActions, UpdateGroupActions, UploadGroupPictureActions } from '../../store/group.actions'

@Component({
  selector: 'app-group-options-menu',
  templateUrl: './group-options-menu.component.html',
  styleUrls: ['./group-options-menu.component.scss'],
  exportAs: 'groupOptionsMenu'
})
export class GroupOptionsMenuComponent {
  @ViewChild(MatMenu, { static: true }) menu: MatMenu
  @Input() group: Group

  constructor(private store: Store, private dialog: DialogService) {}

  updateGroup(): void {
    this.store.dispatch(UpdateGroupActions.openUpdateGroupDialog({ groupId: this.group.id }))
  }

  deleteGroup(): void {
    this.store.dispatch(DeleteGroupActions.deleteGroup({ groupId: this.group.id }))
  }

  changeGroupPicture(): void {
    const data = { title: 'Upload Group Image', minWidth: 1200, aspectRatio: 2.7, fileName: 'group_picture' }
    this.store.dispatch(UploadGroupPictureActions.uploadGroupPicture({ groupId: this.group.id, data }))
  }

  copyInviteLink(): void {
    navigator.clipboard.writeText(`${location.origin}/groups/join?inviteCode=${this.group.inviteCode}`)
  }
}
