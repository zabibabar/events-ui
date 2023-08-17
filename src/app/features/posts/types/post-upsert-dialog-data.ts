import { PostCreateDto } from '../dtos/post-create-dto'
import { PostUpdateDto } from '../dtos/post-update-dto'
import { Post } from '../interfaces/post.interface'

export type PostUpsertDialogData =
  | {
      title: string
      submitText: string
    } & (
      | { type: 'create'; onSubmit: (post: PostCreateDto) => void }
      | { type: 'update'; post: Post; onSubmit: (updates: PostUpdateDto) => void }
    )
