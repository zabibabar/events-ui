import { Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { Group } from '../../interfaces/group'
import { DeleteGroupActions, UpdateGroupActions } from '../../store/group.actions'

@Component({
  selector: 'app-group-options-menu',
  templateUrl: './group-options-menu.component.html',
  styleUrls: ['./group-options-menu.component.scss']
})
export class GroupOptionsMenuComponent {
  @Input() group: Group

  constructor(private store: Store) {}

  updateGroup(): void {
    this.store.dispatch(UpdateGroupActions.openDialog({ group: this.group }))
  }

  deleteGroup(): void {
    this.store.dispatch(DeleteGroupActions.deleteGroup({ groupId: this.group.id }))
  }
}
