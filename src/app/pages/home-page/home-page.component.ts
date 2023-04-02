import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { FetchAllGroupsActions } from 'src/app/features/groups/store/group.actions'

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(private store: Store) {
    this.store.dispatch(FetchAllGroupsActions.fetchAllGroups())
  }
}
