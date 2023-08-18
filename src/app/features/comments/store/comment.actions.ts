import { createAction, createActionGroup, props } from '@ngrx/store'
import { CommentCreateDto } from '../dtos/comment-create-dto'
import { CommentUpdateDto } from '../dtos/comment-update-dto'
import { CommentApi } from '../interfaces/comment-api.interface'

export const AddCommentActions = createActionGroup({
  source: 'Comment',
  events: {
    'Open Add Comment Dialog': props<{ postId: string; postName: string }>(),
    'Add Comment': props<{ postId: string; post: CommentCreateDto }>(),
    'Add Comment Error': props<{ error: string }>(),
    'Add Comment Success': props<{ postId: string; comments: CommentApi[] }>()
  }
})

export const UpdateCommentActions = createActionGroup({
  source: 'Comment',
  events: {
    'Open Update Comment Dialog': props<{ postId: string; commentId: string }>(),
    'Update Comment': props<{ postId: string; commentId: string; post: CommentUpdateDto }>(),
    'Update Comment Error': props<{ error: string }>(),
    'Update Comment Success': props<{ commentId: string; postId: string; comments: CommentApi[] }>()
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
    'Like Comment Success': props<{ commentId: string; postId: string; comments: CommentApi[] }>()
  }
})

export const UnlikeCommentActions = createActionGroup({
  source: 'Comment',
  events: {
    'Unlike Comment': props<{ postId: string; commentId: string }>(),
    'Unlike Comment Error': props<{ error: string }>(),
    'Unlike Comment Success': props<{ commentId: string; postId: string; comments: CommentApi[] }>()
  }
})

export const CloseUpsertPostFormDialog = createAction('[Post] Close Upsert Post Form Dialog')
export const CloseUpsertCommentFormDialog = createAction('[Comment] Close Upsert Comment Form Dialog')
