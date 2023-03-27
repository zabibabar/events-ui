import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { UploadImageData } from 'src/app/shared/upload-image/upload-image-data'
import { UserAuthActions } from '../../store/user-auth/user-auth.actions'
import { UploadUserPictureActions } from '../../store/user/user.actions'
import { selectCurrentUser } from '../../store/user/user.selectors'

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDropdownComponent {
  user$ = this.store.select(selectCurrentUser)

  constructor(private readonly store: Store) {}

  changeUserPicture(userId: string): void {
    const uploadAction = (imageFile: File) =>
      this.store.dispatch(UploadUserPictureActions.uploadUserPicture({ userId, imageFile }))

    const data: UploadImageData = {
      title: 'Upload User Image',
      minWidth: 400,
      aspectRatio: 1,
      uploadAction
    }

    this.store.dispatch(UploadUserPictureActions.openUploadUserPictureDialog({ data }))
  }

  login() {
    this.store.dispatch(UserAuthActions.signIn({ returnUrl: '/' }))
  }

  logout() {
    this.store.dispatch(UserAuthActions.signOut())
  }
}
