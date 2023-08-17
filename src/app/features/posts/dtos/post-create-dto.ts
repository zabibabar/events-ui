import { PostApi } from '../interfaces/post-api.interface'

export type PostCreateDto = Omit<PostApi, 'id' | 'createdById' | 'comments' | 'likes'>
