import { PostCreateDto } from './post-create-dto'

export type PostUpdateDto = Partial<Omit<PostCreateDto, 'sourceId' | 'sourceModel'>>
