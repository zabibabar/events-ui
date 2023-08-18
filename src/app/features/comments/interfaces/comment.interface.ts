import { CommentApi } from './comment-api.interface'

export interface Comment extends CommentApi {
  postId: string
}
