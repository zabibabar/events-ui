import { PostComment } from '../interfaces/post-comment.interface'

export type PostCommentCreateDto = Omit<PostComment, 'likes' | 'userId'>
