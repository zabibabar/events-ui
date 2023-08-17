import { Component, Input, OnInit } from '@angular/core'
import { PostComment } from '../../interfaces/post-comment.interface'
import { Store } from '@ngrx/store'
import {
  LikeCommentActions,
  UnlikeCommentActions,
  UpdateCommentActions,
  RemoveCommentActions
} from '../../store/post.actions'

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  @Input() comment: PostComment
  @Input() eventId: string

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
