import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { selectCurrentGroupDescription } from '../../store/group.selectors'

@Component({
  selector: 'app-group-description',
  templateUrl: './group-description.component.html',
  styleUrls: ['./group-description.component.scss']
})
export class GroupDescriptionComponent {
  description$: Observable<string> = this.store.select(selectCurrentGroupDescription)

  constructor(private store: Store) {}
}
