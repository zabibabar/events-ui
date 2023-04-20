import { User } from '../../users/interfaces/user'

export interface Attendee {
  id: string
  isGoing: boolean
  isOrganizer: boolean
  user?: User
  updatedAt: string
  createdAt: string
}
