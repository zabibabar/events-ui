import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { UploadImageData } from 'src/app/shared/upload-image/upload-image-data'
import { UserCreateDto } from '../../dtos/user-create-dto'
import { UserUpdateDto } from '../../dtos/user-update-dto'
import { User } from '../../interfaces/user'

export const FetchOneUserActions = createActionGroup({
  source: 'Users',
  events: {
    'Fetch One User': props<{ userId: string }>(),
    'Fetch One User Error': props<{ error: string }>(),
    'Fetch One User Success': props<{ user: User }>()
  }
})

export const FetchCurrentUserActions = createActionGroup({
  source: 'Users',
  events: {
    'Fetch Current User': props<{ externalId: string }>(),
    'Fetch Current User Error': props<{ error: string }>(),
    'Fetch Current User Success': props<{ user: User }>()
  }
})

export const CreateUserActions = createActionGroup({
  source: 'Users',
  events: {
    'Create User': props<{ user: UserCreateDto }>(),
    'Create User Error': props<{ error: string }>(),
    'Create User Success': props<{ user: User }>()
  }
})

export const UpdateUserActions = createActionGroup({
  source: 'Users',
  events: {
    'Update User': props<{ userId: string; changes: UserUpdateDto }>(),
    'Update User Error': props<{ error: string }>(),
    'Update User Success': props<{ user: User }>()
  }
})

export const DeleteUserActions = createActionGroup({
  source: 'Users',
  events: {
    'Delete User': props<{ userId: string }>(),
    'Delete User Error': props<{ error: string }>(),
    'Delete User Success': props<{ userId: string }>()
  }
})

export const UploadUserPictureActions = createActionGroup({
  source: 'Users',
  events: {
    'Open Upload User Picture Dialog': props<{ data: UploadImageData }>(),
    'Upload User Picture': props<{ userId: string; imageFile: File }>(),
    'Upload User Picture Loading': emptyProps(),
    'Upload User Picture Error': props<{ error: string }>(),
    'Upload User Picture Success': props<{ userId: string; imageUrl: string }>()
  }
})
