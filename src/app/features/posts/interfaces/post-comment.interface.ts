import { PostCommentApi } from './post-comment-api.interface'

export interface PostComment extends PostCommentApi {
  postId: string
}
