import { User } from '../../users/interfaces/user'
import { Like } from './comment-like.interface'

export interface CommentApi {
  id: string
  userId: string
  user: User
  body: string
  likes: Like[]
}
