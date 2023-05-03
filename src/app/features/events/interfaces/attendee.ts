import { User } from '../../users/interfaces/user'

export interface Attendee {
  id: string
  isGoing: boolean
  isOrganizer: boolean
  guests: number
  user?: User
  updatedAt: string
  createdAt: string
}
