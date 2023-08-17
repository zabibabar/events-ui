import { Component, Input, OnInit } from '@angular/core'
import { Post } from '../../interfaces/post.interface'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post

  posts$: Observable<Post[]>

  constructor(private store: Store) {}

  ngOnInit(): void {
    return
  }
}
