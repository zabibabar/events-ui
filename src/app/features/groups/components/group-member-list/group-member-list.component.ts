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
  filter = new FormControl('', { nonNullable: true })
  filteredGroupMembers$: Observable<Member[]>
  // private groupMembers$: Observable<Member[]> = this.store.select(selectCurrentGroupMembers).pipe(
  //   map(() =>
  //     Array.from({ length: 10 }, () => ({
  //       id: 'Zabeeh Ullah Babar',
  //       createdAt: '2023-03-11T01:25:23.052Z'
  //     }))
  //   )
  // )
  private groupMembers$: Observable<Member[]> = this.store.select(selectCurrentGroupMembers)
  membersCount$ = this.groupMembers$.pipe(map((members) => members.length))

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
            members.filter((member) => member.id.toLowerCase().indexOf((searchTerm as string).toLowerCase()) !== -1)
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