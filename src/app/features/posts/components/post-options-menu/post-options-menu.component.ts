import { Component, Input, ViewChild } from '@angular/core'
import { MatMenu } from '@angular/material/menu'
import { Store } from '@ngrx/store'
import { Post } from '../../interfaces/post.interface'
import { DeletePostActions, UpdatePostActions } from '../../store/post.actions'

@Component({
  selector: 'app-post-options-menu',
  templateUrl: './post-options-menu.component.html',
  styleUrls: ['./post-options-menu.component.scss'],
  exportAs: 'postOptionsMenu'
})
export class PostOptionsMenuComponent {
  @ViewChild(MatMenu, { static: true }) menu: MatMenu
  @Input() post: Post

  constructor(private store: Store) {}

  deletePost(): void {
    const { id: postId } = this.post
    this.store.dispatch(DeletePostActions.openDeletePostDialog({ postId }))
  }

  editPost(): void {
    const { id: postId } = this.post
    this.store.dispatch(UpdatePostActions.openUpdatePostDialog({ postId }))
  }
}
