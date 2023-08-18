import { Action, ActionReducer, createReducer, on } from '@ngrx/store'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import * as CommentActions from './comment.actions'
import * as PostActions from '../../posts/store/post.actions'
import { Comment } from '../interfaces/comment.interface'
import { CommentApi } from '../interfaces/comment-api.interface'
import { PostApi } from '../../posts/interfaces/post-api.interface'

export const commentFeatureSelector = 'comments'

export interface CommentStoreState extends EntityState<Comment> {
  loading: boolean
  error: string | null
}

export const adapter: EntityAdapter<Comment> = createEntityAdapter<Comment>({
  selectId: (comment: Comment) => comment.id
})

const initialState: CommentStoreState = adapter.getInitialState({
  loading: false,
  error: null
})

export const commentReducer: ActionReducer<CommentStoreState, Action> = createReducer(
  initialState,
  on(
    CommentActions.UpdateCommentActions.updateComment,
    CommentActions.UpdateCommentActions.updateComment,
    CommentActions.AddCommentActions.addComment,
    CommentActions.UpdateCommentActions.updateComment,
    CommentActions.RemoveCommentActions.removeComment,
    CommentActions.LikeCommentActions.likeComment,
    CommentActions.UnlikeCommentActions.unlikeComment,
    (state): CommentStoreState => ({ ...state, loading: true })
  ),
  on(
    CommentActions.UpdateCommentActions.updateCommentError,
    CommentActions.UpdateCommentActions.updateCommentError,
    CommentActions.AddCommentActions.addCommentError,
    CommentActions.UpdateCommentActions.updateCommentError,
    CommentActions.RemoveCommentActions.removeCommentError,
    CommentActions.LikeCommentActions.likeCommentError,
    CommentActions.UnlikeCommentActions.unlikeCommentError,
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
    CommentActions.AddCommentActions.addCommentSuccess,
    CommentActions.UpdateCommentActions.updateCommentSuccess,
    CommentActions.LikeCommentActions.likeCommentSuccess,
    CommentActions.UnlikeCommentActions.unlikeCommentSuccess,
    (state, { postId, comments }): CommentStoreState =>
      adapter.upsertMany(convertCommentApiArrayToCommentArray(comments, postId), {
        ...state,
        error: null,
        loading: false
      })
  ),
  on(
    CommentActions.RemoveCommentActions.removeCommentSuccess,
    (state, { commentId }): CommentStoreState => adapter.removeOne(commentId, { ...state, error: null, loading: false })
  )
)

const getCommentsFromPost = (posts: PostApi[]): Comment[] =>
  posts.reduce<Comment[]>((t, { id, comments }) => [...t, ...convertCommentApiArrayToCommentArray(comments, id)], [])

const convertCommentApiArrayToCommentArray = (comments: CommentApi[], postId: string): Comment[] =>
  comments.map((c) => ({
    ...c,
    postId
  }))
