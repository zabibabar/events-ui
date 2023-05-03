import { Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { Group } from '../../interfaces/group'
import { CreateGroupActions, FetchNextGroupsActions } from '../../store/group.actions'
import { selectHasMoreGroups, selectIsLoadingGroupAction } from '../../store/group.selectors'

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent {
  @Input() groups: Group[] = []
  @Input() showMoreOption = false

  hasMoreGroups$ = this.store.select(selectHasMoreGroups)
  loading$ = this.store.select(selectIsLoadingGroupAction)

  constructor(private store: Store) {}

  createGroup(): void {
    this.store.dispatch(CreateGroupActions.openCreateGroupDialog())
  }

  groupTrackBy(_: number, group: Group) {
    return group.id
  }

  fetchNextGroups(): void {
    this.store.dispatch(FetchNextGroupsActions.fetchNextGroups())
  }
}
