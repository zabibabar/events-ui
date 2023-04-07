import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { FetchAllGroupsActions } from 'src/app/features/groups/store/group.actions'

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(FetchAllGroupsActions.fetchAllGroups({ filterOptions: { limit: 20 } }))
  }
}
