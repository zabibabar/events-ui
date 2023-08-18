import { Component, ViewChild } from '@angular/core'
import { MatMenu } from '@angular/material/menu'

@Component({
  selector: 'app-comment-options-menu',
  templateUrl: './comment-options-menu.component.html',
  styleUrls: ['./comment-options-menu.component.scss'],
  exportAs: 'commentOptionsMenu'
})
export class CommentOptionsMenuComponent {
  @ViewChild(MatMenu, { static: true }) menu: MatMenu
}
