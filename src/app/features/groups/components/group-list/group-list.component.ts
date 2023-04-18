import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Group } from '../../interfaces/group'
import { selectAllGroups } from '../../store/group.selectors'
import { CreateGroupActions } from '../../store/group.actions'

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  groups$: Observable<Group[]>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.groups$ = this.store.select(selectAllGroups)
  }

  createGroup(): void {
    this.store.dispatch(CreateGroupActions.openCreateGroupDialog())
  }

  groupTrackBy(_: number, group: Group) {
    return group.id
  }
}
