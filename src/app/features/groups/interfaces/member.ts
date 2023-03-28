import { UserEmbedded } from '../../users/interfaces/user-embedded'

export interface Member {
  id: string
  isOrganizer: boolean
  createdAt: string
  user?: UserEmbedded
}
