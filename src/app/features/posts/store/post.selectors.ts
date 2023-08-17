import { Dictionary } from '@ngrx/entity'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { adapter, postFeatureSelector, PostStoreState } from './post.reducer'
import { Post } from '../interfaces/post.interface'
import { selectCurrentEvent } from '../../events/store/event.selectors'

const { selectEntities, selectAll } = adapter.getSelectors()

export const selectPostState = createFeatureSelector<PostStoreState>(postFeatureSelector)
export const selectPostEntities = createSelector(selectPostState, selectEntities)
export const selectAllPosts = createSelector(selectPostState, selectAll)
export const selectIsLoadingPostAction = createSelector(selectPostState, (state) => state.loading)

export const selectPostById = (props: { postId: string }) =>
  createSelector(selectPostEntities, (postEntities: Dictionary<Post>) => postEntities[props.postId])

export const selectPostsForCurrentEvent = createSelector(selectCurrentEvent, selectAllPosts, (event, posts: Post[]) =>
  posts.filter(({ sourceId }) => sourceId === event?.id)
)

export const selectPostsForCurrentGroup = createSelector(selectCurrentEvent, selectAllPosts, (event, posts: Post[]) =>
  posts.filter(({ sourceId }) => sourceId === event?.groupId)
)
