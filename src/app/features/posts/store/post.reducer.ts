import { Action, ActionReducer, createReducer, on } from '@ngrx/store'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import * as PostActions from './post.actions'
import { PostApi } from '../interfaces/post-api.interface'
import { Post } from '../interfaces/post.interface'

export const postFeatureSelector = 'posts'

export interface PostStoreState extends EntityState<Post> {
  loading: boolean
  error: string | null
}

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  selectId: (post: Post) => post.id
})

const initialState: PostStoreState = adapter.getInitialState({
  loading: false,
  error: null
})

export const postReducer: ActionReducer<PostStoreState, Action> = createReducer(
  initialState,
  on(
    PostActions.FetchAllPostsActions.fetchAllPosts,
    PostActions.CreatePostActions.createPost,
    PostActions.UpdatePostActions.updatePost,
    PostActions.DeletePostActions.deletePost,
    (state): PostStoreState => ({ ...state, loading: true })
  ),
  on(
    PostActions.FetchAllPostsActions.fetchAllPostsError,
    PostActions.CreatePostActions.createPostError,
    PostActions.UpdatePostActions.updatePostError,
    PostActions.DeletePostActions.deletePostError,
    (state, { error }): PostStoreState => ({ ...state, error, loading: false })
  ),
  on(
    PostActions.FetchAllPostsActions.fetchAllPostsSuccess,
    (state, { posts }): PostStoreState =>
      adapter.upsertMany(getPostsFromPostsApi(posts), {
        ...state,
        error: null,
        loading: false
      })
  ),
  on(
    PostActions.CreatePostActions.createPostSuccess,
    PostActions.UpdatePostActions.updatePostSuccess,
    (state, { post }): PostStoreState =>
      adapter.upsertOne(convertPostApiToPost(post), { ...state, error: null, loading: false })
  ),
  on(
    PostActions.DeletePostActions.deletePostSuccess,
    (state, { postId }): PostStoreState => adapter.removeOne(postId, { ...state, error: null, loading: false })
  )
)

const getPostsFromPostsApi = (posts: PostApi[]): Post[] => posts.map((t) => convertPostApiToPost(t))

const convertPostApiToPost = ({ ...post }: PostApi): Post => post
