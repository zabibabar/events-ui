import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { User } from 'src/app/features/users/interfaces/user'
import { FetchOneUserActions } from 'src/app/features/users/store/user/user.actions'
import { selectUserById } from 'src/app/features/users/store/user/user.selectors'
import { Member } from '../../interfaces/member'

@Component({
  selector: 'app-group-member',
  templateUrl: './group-member.component.html',
  styleUrls: ['./group-member.component.scss']
})
export class GroupMemberComponent implements OnInit {
  @Input() groupMember: Member
  user$: Observable<User | undefined>

  constructor(private store: Store) {}

  ngOnInit(): void {
    const { id: userId } = this.groupMember
    this.store.dispatch(FetchOneUserActions.fetchOneUser({ userId }))
    this.user$ = this.store.select(selectUserById({ userId }))
  }
}
