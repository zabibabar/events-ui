import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Store } from '@ngrx/store'
import { debounceTime, distinctUntilChanged, filter, map, merge, Observable, startWith, switchMap } from 'rxjs'
import { Member } from 'src/app/features/groups/interfaces/member'
import { selectCurrentGroupMembers } from '../../store/group.selectors'

@Component({
  selector: 'app-group-member-list',
  templateUrl: './group-member-list.component.html',
  styleUrls: ['./group-member-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupMemberListComponent implements OnInit {
  private groupMembers$: Observable<Member[]> = this.store.select(selectCurrentGroupMembers)
  membersCount$ = this.groupMembers$.pipe(map((members) => members.length))
  filter = new FormControl('', { nonNullable: true })
  filteredGroupMembers$: Observable<Member[]>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.filteredGroupMembers$ = this.getFilterMembersList()
  }

  private getFilterMembersList(): Observable<Member[]> {
    const searchTerm$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((x) => x.trim())
    )

    const filterBySearchTerm$ = searchTerm$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((searchTerm) => searchTerm.length > 0),
      switchMap((searchTerm) =>
        this.groupMembers$.pipe(
          map((members) =>
            members.filter((member) => member.user?.name.toLowerCase().includes(searchTerm.toLowerCase()))
          )
        )
      )
    )

    const unchangedMembers$ = searchTerm$.pipe(
      filter((searchTerm) => searchTerm.length === 0),
      switchMap(() => this.groupMembers$)
    )

    return merge(filterBySearchTerm$, unchangedMembers$)
  }
}
