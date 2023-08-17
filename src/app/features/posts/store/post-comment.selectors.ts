import { Dictionary } from '@ngrx/entity'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { adapter, postFeatureSelector, CommentStoreState } from './post-comment.reducer'
import { PostComment } from '../interfaces/post-comment.interface'

const { selectEntities, selectAll } = adapter.getSelectors()

export const selectCommentState = createFeatureSelector<CommentStoreState>(postFeatureSelector)
export const selectCommentEntities = createSelector(selectCommentState, selectEntities)
export const selectAllComments = createSelector(selectCommentState, selectAll)
export const selectIsLoadingCommentAction = createSelector(selectCommentState, (state) => state.loading)

export const selectCommentById = (props: { postId: string }) =>
  createSelector(selectCommentEntities, (postEntities: Dictionary<PostComment>) => postEntities[props.postId])

export const selectCommentsByPostId = (props: { postId: string }) =>
  createSelector(selectAllComments, (posts: PostComment[]) => posts.filter(({ id }) => id === props.postId))
