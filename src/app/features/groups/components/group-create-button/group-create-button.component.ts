import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { CreateGroupActions } from '../../store/group.actions'

@Component({
  selector: 'app-group-create-button',
  templateUrl: './group-create-button.component.html',
  styleUrls: ['./group-create-button.component.scss']
})
export class GroupCreateButtonComponent {
  constructor(private store: Store) {}

  openDialog(): void {
    this.store.dispatch(CreateGroupActions.openCreateGroupDialog())
  }
}
