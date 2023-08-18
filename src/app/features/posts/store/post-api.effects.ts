import { Injectable } from '@angular/core'
import { PostApiService } from '../services/post-api.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { ToastService } from 'src/app/shared/toast'
import * as PostActions from './post.actions'
import { exhaustMap, map, catchError, of, tap, mergeMap } from 'rxjs'

@Injectable()
export class PostApiEffects {
  constructor(private actions$: Actions, private postApiService: PostApiService, private toast: ToastService) {}

  fetchAllPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.FetchAllPostsActions.fetchAllPosts),
      exhaustMap(({ sourceId }) => {
        return this.postApiService.getAllPosts(sourceId).pipe(
          map((posts) => PostActions.FetchAllPostsActions.fetchAllPostsSuccess({ posts })),
          catchError((error) => of(PostActions.FetchAllPostsActions.fetchAllPostsError({ error })))
        )
      })
    )
  })

  createPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.CreatePostActions.createPost),
      exhaustMap(({ post }) =>
        this.postApiService.createPost(post).pipe(
          map((post) => PostActions.CreatePostActions.createPostSuccess({ post })),
          tap(() => this.toast.success('Post Created Successfully!')),
          catchError((error) =>
            of(PostActions.CreatePostActions.createPostError({ error })).pipe(
              tap(() => this.toast.error('Error Creating Post! Try Again Later'))
            )
          )
        )
      )
    )
  })

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.UpdatePostActions.updatePost),
      mergeMap(({ postId, post }) =>
        this.postApiService.updatePost(postId, post).pipe(
          map((post) => PostActions.UpdatePostActions.updatePostSuccess({ post })),
          tap(() => this.toast.success('Post Updated Successfully!')),
          catchError((error) => of(PostActions.UpdatePostActions.updatePostError({ error })))
        )
      )
    )
  })

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.DeletePostActions.deletePost),
      mergeMap(({ postId }) =>
        this.postApiService.deletePost(postId).pipe(
          map(() => PostActions.DeletePostActions.deletePostSuccess({ postId })),
          tap(() => this.toast.success('Post Deleted Successfully!')),
          catchError((error) =>
            of(PostActions.DeletePostActions.deletePostError({ error })).pipe(
              tap(() => this.toast.error('Error Deleting Post! Try Again Later'))
            )
          )
        )
      )
    )
  })

  likePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.LikePostActions.likePost),
      mergeMap(({ postId }) =>
        this.postApiService.likePost(postId).pipe(
          map((post) => PostActions.LikePostActions.likePostSuccess({ postId, post })),
          catchError((error) => of(PostActions.LikePostActions.likePostError({ error })))
        )
      )
    )
  })

  unlikePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.UnlikePostActions.unlikePost),
      mergeMap(({ postId }) =>
        this.postApiService.unlikePost(postId).pipe(
          map((post) => PostActions.UnlikePostActions.unlikePostSuccess({ postId, post })),
          catchError((error) => of(PostActions.UnlikePostActions.unlikePostError({ error })))
        )
      )
    )
  })
}