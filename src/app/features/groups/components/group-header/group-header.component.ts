import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectCurrentGroup } from '../../store/group.selectors'

@Component({
  selector: 'app-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.scss']
})
export class GroupHeaderComponent {
  links = ['About', 'Events', 'Members', 'Photos']
  activeLink = this.links[0]

  group$ = this.store.select(selectCurrentGroup)

  constructor(private store: Store) {}
}
