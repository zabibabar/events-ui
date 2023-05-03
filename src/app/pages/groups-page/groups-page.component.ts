import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectAllGroups } from 'src/app/features/groups/store/group.selectors'

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent {
  groups$ = this.store.select(selectAllGroups)

  constructor(private store: Store) {}
}
