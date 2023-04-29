import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { FetchGroupsActions } from 'src/app/features/groups/store/group.actions'

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(FetchGroupsActions.fetchGroups())
  }
}
