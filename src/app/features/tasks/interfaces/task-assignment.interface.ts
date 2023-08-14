import { User } from '../../users/interfaces/user'

export interface TaskAssignment {
  userId: string
  notes?: string
  user?: User
}
