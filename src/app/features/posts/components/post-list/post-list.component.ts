import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { selectPostsBySourceId } from '../../store/post.selectors'
import { Post } from '../../interfaces/post.interface'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() sourceId: string
  posts$: Observable<Post[]>

  constructor(private store: Store) {}

  ngOnInit(): void {
    // this.posts$ = this.store.select(selectPostsBySourceId({ sourceId: this.sourceId }))
    this.posts$ = of([
      {
        id: '1',
        sourceId: '1',
        sourceModel: 'events',
        createdById: '1',
        body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium et reprehenderit, cum impedit soluta quibusdam aut aperiam placeat quo suscipit maxime officia, corrupti pariatur facere a at minima doloribus quos.',
        imageUrl: 'https://t3.ftcdn.net/jpg/05/38/69/82/360_F_538698278_SNYyTZlw4OgphIk46lk3YmkLwkWzyBKP.jpg',
        createdBy: {
          id: '1',
          name: 'Zabi Babar',
          picture:
            'https://res.cloudinary.com/dmtvchdf2/image/upload/v1679932964/users/640bcfbcdeb2965064508e3b/profile.png'
        }
      },
      {
        id: '1',
        sourceId: '1',
        sourceModel: 'events',
        createdById: '1',
        body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium et reprehenderit, cum impedit soluta quibusdam aut aperiam placeat quo suscipit maxime officia, corrupti pariatur facere a at minima doloribus quos.',
        imageUrl:
          'https://media.grapevine.org/__sized__/uploads/circle/hero/8778f4a6f9bf4e42a63fd2c8778b12c6-thumbnail-2048x2048-80.jpg',
        createdBy: {
          id: '1',
          name: 'Zabi Babar',
          picture:
            'https://res.cloudinary.com/dmtvchdf2/image/upload/v1679932964/users/640bcfbcdeb2965064508e3b/profile.png'
        }
      },
      {
        id: '1',
        sourceId: '1',
        sourceModel: 'events',
        createdById: '1',
        body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium et reprehenderit, cum impedit soluta quibusdam aut aperiam placeat quo suscipit maxime officia, corrupti pariatur facere a at minima doloribus quos.',
        createdBy: {
          id: '1',
          name: 'Zabi Babar',
          picture:
            'https://res.cloudinary.com/dmtvchdf2/image/upload/v1679932964/users/640bcfbcdeb2965064508e3b/profile.png'
        }
      }
    ])
  }
}
