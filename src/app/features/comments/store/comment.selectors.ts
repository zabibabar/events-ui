import { Dictionary } from '@ngrx/entity'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { adapter, postFeatureSelector, CommentStoreState } from './comment.reducer'
import { Comment } from '../interfaces/comment.interface'

const { selectEntities, selectAll } = adapter.getSelectors()

export const selectCommentState = createFeatureSelector<CommentStoreState>(postFeatureSelector)
export const selectCommentEntities = createSelector(selectCommentState, selectEntities)
export const selectAllComments = createSelector(selectCommentState, selectAll)
export const selectIsLoadingCommentAction = createSelector(selectCommentState, (state) => state.loading)

export const selectCommentById = (props: { postId: string }) =>
  createSelector(selectCommentEntities, (postEntities: Dictionary<Comment>) => postEntities[props.postId])

export const selectCommentsByPostId = (props: { postId: string }) =>
  createSelector(selectAllComments, (posts: Comment[]) => posts.filter(({ id }) => id === props.postId))
