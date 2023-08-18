import { createAction, createActionGroup, props } from '@ngrx/store'
import { PostApi } from '../interfaces/post-api.interface'
import { PostCreateDto } from '../dtos/post-create-dto'
import { PostUpdateDto } from '../dtos/post-update-dto'

export const FetchAllPostsActions = createActionGroup({
  source: 'Post',
  events: {
    'Fetch All Posts': props<{ sourceId: string }>(),
    'Fetch All Posts Error': props<{ error: string }>(),
    'Fetch All Posts Success': props<{ posts: PostApi[] }>()
  }
})

export const CreatePostActions = createActionGroup({
  source: 'Post',
  events: {
    'Open Create Post Dialog': props<{ sourceId: string }>(),
    'Create Post': props<{ sourceId: string; post: PostCreateDto }>(),
    'Create Post Error': props<{ error: string }>(),
    'Create Post Success': props<{ post: PostApi }>()
  }
})

export const UpdatePostActions = createActionGroup({
  source: 'Post',
  events: {
    'Open Update Post Dialog': props<{ postId: string }>(),
    'Update Post': props<{ postId: string; post: PostUpdateDto }>(),
    'Update Post Error': props<{ error: string }>(),
    'Update Post Success': props<{ post: PostApi }>()
  }
})

export const DeletePostActions = createActionGroup({
  source: 'Post',
  events: {
    'Open Delete Post Dialog': props<{ postId: string }>(),
    'Delete Post': props<{ postId: string }>(),
    'Delete Post Error': props<{ error: string }>(),
    'Delete Post Success': props<{ postId: string }>()
  }
})

export const LikePostActions = createActionGroup({
  source: 'Post',
  events: {
    'Like Post': props<{ postId: string; commentId: string }>(),
    'Like Post Error': props<{ error: string }>(),
    'Like Post Success': props<{ postId: string; post: PostApi }>()
  }
})

export const UnlikePostActions = createActionGroup({
  source: 'Post',
  events: {
    'Unlike Post': props<{ postId: string; commentId: string }>(),
    'Unlike Post Error': props<{ error: string }>(),
    'Unlike Post Success': props<{ postId: string; post: PostApi }>()
  }
})

export const CloseUpsertPostFormDialog = createAction('[Post] Close Upsert Post Form Dialog')
