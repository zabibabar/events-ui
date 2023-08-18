import { User } from '../../users/interfaces/user'

export interface Post {
  id: string
  createdById: string
  createdBy: User
  sourceId: string
  sourceModel: string
  body: string
  imageUrl?: string
}
