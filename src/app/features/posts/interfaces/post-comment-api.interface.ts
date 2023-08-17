import { PostLike } from './post-like.interface'

export interface PostCommentApi {
  id: string
  userId: string
  body: string
  likes: PostLike[]
}
