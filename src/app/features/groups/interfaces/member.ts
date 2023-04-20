import { User } from '../../users/interfaces/user'

export interface Member {
  id: string
  isOrganizer: boolean
  createdAt: string
  user?: User
}
