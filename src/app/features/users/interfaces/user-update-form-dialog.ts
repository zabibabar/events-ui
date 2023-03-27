import { UserUpdateDto } from '../dtos/user-update-dto'
import { User } from './user'

export interface UserUpdateDialogData {
  title: string
  user: User
  onSubmit: (user: UserUpdateDto) => void
  submitText: string
}
