import { createAction, createActionGroup, props } from '@ngrx/store'
import { PostCommentCreateDto } from '../dtos/post-comment-create-dto'
import { PostCommentUpdateDto } from '../dtos/post-comment-update-dto'
import { PostApi } from '../interfaces/post-api.interface'
import { PostCommentApi } from '../interfaces/post-comment-api.interface'
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

export const AddCommentActions = createActionGroup({
  source: 'Comment',
  events: {
    'Open Add Comment Dialog': props<{ postId: string; postName: string }>(),
    'Add Comment': props<{ postId: string; post: PostCommentCreateDto }>(),
    'Add Comment Error': props<{ error: string }>(),
    'Add Comment Success': props<{ commentId: string; postId: string; comments: PostCommentApi[] }>()
  }
})

export const UpdateCommentActions = createActionGroup({
  source: 'Comment',
  events: {
    'Open Update Comment Dialog': props<{ postId: string; commentId: string }>(),
    'Update Comment': props<{ postId: string; commentId: string; post: PostCommentUpdateDto }>(),
    'Update Comment Error': props<{ error: string }>(),
    'Update Comment Success': props<{ commentId: string; postId: string; comments: PostCommentApi[] }>()
  }
})

export const RemoveCommentActions = createActionGroup({
  source: 'Comment',
  events: {
    'Open Remove Comment Dialog': props<{ postId: string; commentId: string }>(),
    'Remove Comment': props<{ postId: string; commentId: string }>(),
    'Remove Comment Error': props<{ error: string }>(),
    'Remove Comment Success': props<{ commentId: string }>()
  }
})

export const LikeCommentActions = createActionGroup({
  source: 'Comment',
  events: {
    'Like Comment': props<{ postId: string; commentId: string }>(),
    'Like Comment Error': props<{ error: string }>(),
    'Like Comment Success': props<{ commentId: string; postId: string; comments: PostCommentApi[] }>()
  }
})

export const UnlikeCommentActions = createActionGroup({
  source: 'Comment',
  events: {
    'Unlike Comment': props<{ postId: string; commentId: string }>(),
    'Unlike Comment Error': props<{ error: string }>(),
    'Unlike Comment Success': props<{ commentId: string; postId: string; comments: PostCommentApi[] }>()
  }
})

export const CloseUpsertPostFormDialog = createAction('[Post] Close Upsert Post Form Dialog')
export const CloseUpsertCommentFormDialog = createAction('[Comment] Close Upsert Comment Form Dialog')
