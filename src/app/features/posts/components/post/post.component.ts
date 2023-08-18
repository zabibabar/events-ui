import { Component, Input, OnInit } from '@angular/core'
import { Post } from '../../interfaces/post.interface'
import { Store } from '@ngrx/store'
import { Observable, map, of } from 'rxjs'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Comment } from 'src/app/features/comments/interfaces/comment.interface'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post

  posts$: Observable<Post[]>
  comments$: Observable<Comment[]>
  isDesktop$ = this.breakpoints
    .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .pipe(map(({ matches }) => matches))
  showComments = false

  constructor(private store: Store, private breakpoints: BreakpointObserver) {}

  ngOnInit(): void {
    // this.comments$ = this.store.select(selectCommentsByPostId({ postId: this.post.id }))
    this.comments$ = of([
      {
        id: '1',
        postId: '1',
        userId: '1',
        user: {
          id: '1',
          name: 'Zabi Babar',
          picture:
            'https://res.cloudinary.com/dmtvchdf2/image/upload/v1679932964/users/640bcfbcdeb2965064508e3b/profile.png'
        },
        likes: [],
        body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium et reprehenderit, cum impedit soluta quibusdam aut aperiam placeat quo suscipit maxime officia, corrupti pariatur facere a at minima doloribus quos.'
      },
      {
        id: '1',
        postId: '1',
        userId: '1',
        user: {
          id: '1',
          name: 'Zabi Babar',
          picture:
            'https://res.cloudinary.com/dmtvchdf2/image/upload/v1679932964/users/640bcfbcdeb2965064508e3b/profile.png'
        },
        likes: [],
        body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium et reprehenderit, cum impedit soluta quibusdam aut aperiam placeat quo suscipit maxime officia, corrupti pariatur facere a at minima doloribus quos.'
      }
    ])
  }
}
