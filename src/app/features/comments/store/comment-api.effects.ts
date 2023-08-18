import { Injectable } from '@angular/core'
import { CommentApiService } from '../services/comment-api.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { ToastService } from 'src/app/shared/toast'
import * as CommentActions from './comment.actions'
import { exhaustMap, map, catchError, of, tap, mergeMap } from 'rxjs'

@Injectable()
export class CommentApiEffects {
  constructor(private actions$: Actions, private commentApiService: CommentApiService, private toast: ToastService) {}

  addComment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommentActions.AddCommentActions.addComment),
      exhaustMap(({ postId, post }) =>
        this.commentApiService.addComment(postId, post).pipe(
          map((comments) => CommentActions.AddCommentActions.addCommentSuccess({ postId, comments })),
          tap(() => this.toast.success('Comment Added Successfully!')),
          catchError((error) => of(CommentActions.AddCommentActions.addCommentError({ error })))
        )
      )
    )
  })

  updateComment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommentActions.UpdateCommentActions.updateComment),
      exhaustMap(({ postId, commentId, post }) =>
        this.commentApiService.updateComment(postId, commentId, post).pipe(
          map((comments) => CommentActions.UpdateCommentActions.updateCommentSuccess({ postId, commentId, comments })),
          tap(() => this.toast.success('Comment Updated Successfully!')),
          catchError((error) => of(CommentActions.UpdateCommentActions.updateCommentError({ error })))
        )
      )
    )
  })

  removeComment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommentActions.RemoveCommentActions.removeComment),
      exhaustMap(({ postId, commentId }) =>
        this.commentApiService.removeComment(postId, commentId).pipe(
          map(() => CommentActions.RemoveCommentActions.removeCommentSuccess({ commentId })),
          tap(() => this.toast.success('Removed Comment Successfully!')),
          catchError((error) => of(CommentActions.RemoveCommentActions.removeCommentError({ error })))
        )
      )
    )
  })

  likeComment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommentActions.LikeCommentActions.likeComment),
      mergeMap(({ postId, commentId }) =>
        this.commentApiService.likeComment(postId, commentId).pipe(
          map((comments) => CommentActions.LikeCommentActions.likeCommentSuccess({ postId, commentId, comments })),
          catchError((error) => of(CommentActions.LikeCommentActions.likeCommentError({ error })))
        )
      )
    )
  })

  unlikeComment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommentActions.UnlikeCommentActions.unlikeComment),
      mergeMap(({ postId, commentId }) =>
        this.commentApiService.unlikeComment(postId, commentId).pipe(
          map((comments) => CommentActions.UnlikeCommentActions.unlikeCommentSuccess({ postId, commentId, comments })),
          catchError((error) => of(CommentActions.UnlikeCommentActions.unlikeCommentError({ error })))
        )
      )
    )
  })
}
