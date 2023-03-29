import { UserEmbedded } from '../../users/interfaces/user-embedded'

export interface Attendee {
  id: string
  isGoing: boolean
  user?: UserEmbedded
}
