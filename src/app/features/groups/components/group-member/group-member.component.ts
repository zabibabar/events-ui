import { Component, Input } from '@angular/core'
import { Member } from '../../interfaces/member'
import { Store } from '@ngrx/store'
import { RemoveGroupMemberActions } from '../../store/group.actions'
import { selectCurrentUserAsGroupMember } from '../../store/group.selectors'

@Component({
  selector: 'app-group-member',
  templateUrl: './group-member.component.html',
  styleUrls: ['./group-member.component.scss']
})
export class GroupMemberComponent {
  @Input() groupMember: Member

  currentUser$ = this.store.select(selectCurrentUserAsGroupMember)

  constructor(private store: Store) {}

  removeGroupMember(): void {
    this.store.dispatch(RemoveGroupMemberActions.removeGroupMember({ userId: this.groupMember.id }))
  }

  makeGroupOrganizer(): void {
    return
  }
}
