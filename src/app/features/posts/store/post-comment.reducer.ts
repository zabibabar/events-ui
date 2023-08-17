import { Action, ActionReducer, createReducer, on } from '@ngrx/store'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import * as PostActions from './post.actions'
import { PostComment } from '../interfaces/post-comment.interface'
import { PostCommentApi } from '../interfaces/post-comment-api.interface'
import { PostApi } from '../interfaces/post-api.interface'

export const postFeatureSelector = 'posts'

export interface CommentStoreState extends EntityState<PostComment> {
  loading: boolean
  error: string | null
}

export const adapter: EntityAdapter<PostComment> = createEntityAdapter<PostComment>({
  selectId: (post: PostComment) => post.id
})

const initialState: CommentStoreState = adapter.getInitialState({
  loading: false,
  error: null
})

export const postReducer: ActionReducer<CommentStoreState, Action> = createReducer(
  initialState,
  on(
    PostActions.UpdateCommentActions.updateComment,
    PostActions.UpdateCommentActions.updateComment,
    PostActions.AddCommentActions.addComment,
    PostActions.UpdateCommentActions.updateComment,
    PostActions.RemoveCommentActions.removeComment,
    PostActions.LikeCommentActions.likeComment,
    PostActions.UnlikeCommentActions.unlikeComment,
    (state): CommentStoreState => ({ ...state, loading: true })
  ),
  on(
    PostActions.UpdateCommentActions.updateCommentError,
    PostActions.UpdateCommentActions.updateCommentError,
    PostActions.AddCommentActions.addCommentError,
    PostActions.UpdateCommentActions.updateCommentError,
    PostActions.RemoveCommentActions.removeCommentError,
    PostActions.LikeCommentActions.likeCommentError,
    PostActions.UnlikeCommentActions.unlikeCommentError,
    (state, { error }): CommentStoreState => ({ ...state, error, loading: false })
  ),
  on(
    PostActions.FetchAllPostsActions.fetchAllPostsSuccess,
    (state, { posts }): CommentStoreState =>
      adapter.upsertMany(getCommentsFromPost(posts), {
        ...state,
        error: null,
        loading: false
      })
  ),
  on(
    PostActions.CreatePostActions.createPostSuccess,
    PostActions.UpdatePostActions.updatePostSuccess,
    (state, { post }): CommentStoreState =>
      adapter.upsertMany(getCommentsFromPost([post]), { ...state, error: null, loading: false })
  ),
  on(
    PostActions.DeletePostActions.deletePostSuccess,
    (state, { postId }): CommentStoreState =>
      adapter.removeMany((t) => t.postId === postId, { ...state, error: null, loading: false })
  ),
  on(
    PostActions.AddCommentActions.addCommentSuccess,
    PostActions.UpdateCommentActions.updateCommentSuccess,
    PostActions.LikeCommentActions.likeCommentSuccess,
    PostActions.UnlikeCommentActions.unlikeCommentSuccess,
    (state, { postId, comments }): CommentStoreState =>
      adapter.upsertMany(convertCommentApiArrayToCommentArray(comments, postId), {
        ...state,
        error: null,
        loading: false
      })
  ),
  on(
    PostActions.RemoveCommentActions.removeCommentSuccess,
    (state, { commentId }): CommentStoreState => adapter.removeOne(commentId, { ...state, error: null, loading: false })
  )
)

const getCommentsFromPost = (posts: PostApi[]): PostComment[] =>
  posts.reduce<PostComment[]>(
    (t, { id, comments }) => [...t, ...convertCommentApiArrayToCommentArray(comments, id)],
    []
  )

const convertCommentApiArrayToCommentArray = (comments: PostCommentApi[], postId: string): PostComment[] =>
  comments.map((c) => ({
    ...c,
    postId
  }))
