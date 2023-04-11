import { Component, Input, ViewChild } from '@angular/core'
import { MatMenu } from '@angular/material/menu'
import { Store } from '@ngrx/store'
import { UploadImageData } from 'src/app/shared/upload-image/upload-image-data'
import { Event } from '../../interfaces/event'
import { DeleteEventActions, UpdateEventActions, UploadEventPictureActions } from '../../store/event.actions'

@Component({
  selector: 'app-event-options-menu',
  templateUrl: './event-options-menu.component.html',
  styleUrls: ['./event-options-menu.component.scss'],
  exportAs: 'eventOptionsMenu'
})
export class EventOptionsMenuComponent {
  @ViewChild(MatMenu, { static: true }) menu: MatMenu
  @Input() event: Event

  constructor(private store: Store) {}

  updateEvent(): void {
    this.store.dispatch(UpdateEventActions.openUpdateEventDialog({ eventId: this.event.id }))
  }

  changeEventPicture(): void {
    const uploadAction = (imageFile: File) =>
      this.store.dispatch(UploadEventPictureActions.uploadEventPicture({ eventId: this.event.id, imageFile }))

    const data: UploadImageData = {
      title: 'Upload Event Image',
      minWidth: 800,
      aspectRatio: 16 / 9,
      uploadAction
    }

    this.store.dispatch(UploadEventPictureActions.openUploadEventPictureDialog({ data }))
  }

  deleteEvent(): void {
    this.store.dispatch(DeleteEventActions.openDeleteEventDialog({ eventId: this.event.id }))
  }
}
