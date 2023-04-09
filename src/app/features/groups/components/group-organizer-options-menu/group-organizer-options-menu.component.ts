import { Component, Input, ViewChild } from '@angular/core'
import { MatMenu } from '@angular/material/menu'
import { Store } from '@ngrx/store'
import { DialogService } from 'src/app/shared/dialog/dialog.service'
import { UploadImageData } from 'src/app/shared/upload-image/upload-image-data'
import { Group } from '../../interfaces/group'
import { DeleteGroupActions, UpdateGroupActions, UploadGroupPictureActions } from '../../store/group.actions'

@Component({
  selector: 'app-group-organizer-options-menu',
  templateUrl: './group-organizer-options-menu.component.html',
  styleUrls: ['./group-organizer-options-menu.component.scss'],
  exportAs: 'groupOrganizerOptionsMenu'
})
export class GroupOrganizerOptionsMenuComponent {
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
    const uploadAction = (imageFile: File) =>
      this.store.dispatch(UploadGroupPictureActions.uploadGroupPicture({ groupId: this.group.id, imageFile }))

    const data: UploadImageData = {
      title: 'Upload Group Image',
      minWidth: 1200,
      aspectRatio: 2.7,
      uploadAction
    }

    this.store.dispatch(UploadGroupPictureActions.openUploadGroupPictureDialog({ data }))
  }
}
