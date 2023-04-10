import { UserEmbedded } from '../../users/interfaces/user-embedded'

export interface Attendee {
  id: string
  isGoing: boolean
  isOrganizer: boolean
  user?: UserEmbedded
  updatedAt: string
  createdAt: string
}
