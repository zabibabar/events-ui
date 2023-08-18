import { Dictionary } from '@ngrx/entity'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { adapter, postFeatureSelector, PostStoreState } from './post.reducer'
import { Post } from '../interfaces/post.interface'

const { selectEntities, selectAll } = adapter.getSelectors()

export const selectPostState = createFeatureSelector<PostStoreState>(postFeatureSelector)
export const selectPostEntities = createSelector(selectPostState, selectEntities)
export const selectAllPosts = createSelector(selectPostState, selectAll)
export const selectIsLoadingPostAction = createSelector(selectPostState, (state) => state.loading)

export const selectPostById = (props: { postId: string }) =>
  createSelector(selectPostEntities, (postEntities: Dictionary<Post>) => postEntities[props.postId])

export const selectPostsBySourceId = (props: { sourceId: string }) =>
  createSelector(selectAllPosts, (posts: Post[]) => posts.filter(({ sourceId }) => sourceId === props.sourceId))
