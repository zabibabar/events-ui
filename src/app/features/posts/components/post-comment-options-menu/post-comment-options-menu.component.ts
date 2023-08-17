import { Component, ViewChild } from '@angular/core'
import { MatMenu } from '@angular/material/menu'

@Component({
  selector: 'app-post-comment-options-menu',
  templateUrl: './post-comment-options-menu.component.html',
  styleUrls: ['./post-comment-options-menu.component.scss'],
  exportAs: 'postCommentOptionsMenu'
})
export class PostCommentOptionsMenuComponent {
  @ViewChild(MatMenu, { static: true }) menu: MatMenu
}
