import { Component, Input } from '@angular/core'
import { Member } from '../../interfaces/member'
import { Store } from '@ngrx/store'
import { RemoveGroupMemberActions, UpdateGroupMemberActions } from '../../store/group.actions'
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

  updateGroupMember(memberId: string, isOrganizer: boolean): void {
    this.store.dispatch(UpdateGroupMemberActions.updateGroupMember({ userId: memberId, updates: { isOrganizer } }))
  }
}
