import { Component, Input, OnInit } from '@angular/core'
import { Comment } from '../../interfaces/comment.interface'
import { Store } from '@ngrx/store'
import {
  LikeCommentActions,
  UnlikeCommentActions,
  UpdateCommentActions,
  RemoveCommentActions
} from '../../store/comment.actions'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment

  constructor(private store: Store) {}

  ngOnInit(): void {
    return
  }

  likeComment(): void {
    const { postId, id: commentId } = this.comment
    this.store.dispatch(LikeCommentActions.likeComment({ postId, commentId }))
  }

  unlikeComment(): void {
    const { postId, id: commentId } = this.comment
    this.store.dispatch(UnlikeCommentActions.unlikeComment({ postId, commentId }))
  }

  editComment(): void {
    const { postId, id: commentId } = this.comment
    this.store.dispatch(UpdateCommentActions.openUpdateCommentDialog({ postId, commentId }))
  }

  deleteComment(): void {
    const { postId, id: commentId } = this.comment
    this.store.dispatch(RemoveCommentActions.openRemoveCommentDialog({ postId, commentId }))
  }
}
