import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { map, Observable } from 'rxjs'
import { Member } from '../../interfaces/member'
import { selectMembersForCurrentGroup } from '../../store/group.selectors'

@Component({
  selector: 'app-group-member-grid',
  templateUrl: './group-member-grid.component.html',
  styleUrls: ['./group-member-grid.component.scss']
})
export class GroupMemberGridComponent {
  private readonly max = 8
  goingMembers$: Observable<Member[]> = this.store.select(selectMembersForCurrentGroup)

  visibleMembers$: Observable<Member[]> = this.goingMembers$.pipe(
    // map((a) => Array.from({ length: 9 }, () => a[0])),
    map((a) => a.slice(0, this.max))
  )

  constructor(private store: Store) {}
}
