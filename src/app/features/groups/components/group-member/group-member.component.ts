import { Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { Member } from '../../interfaces/member'

@Component({
  selector: 'app-group-member',
  templateUrl: './group-member.component.html',
  styleUrls: ['./group-member.component.scss']
})
export class GroupMemberComponent {
  @Input() groupMember: Member

  constructor(private store: Store) {}
}
