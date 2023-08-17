import { PostComment } from './post-comment.interface'
import { PostLike } from './post-like.interface'
import { Post } from './post.interface'

export interface PostApi extends Post {
  likes: PostLike[]
  comments: PostComment[]
}
