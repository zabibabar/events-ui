import { Comment } from '../interfaces/comment.interface'

export type CommentCreateDto = Omit<Comment, 'likes' | 'userId'>
