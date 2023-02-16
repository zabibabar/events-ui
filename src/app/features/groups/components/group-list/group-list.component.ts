import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Group } from '../../interfaces/group'
import { selectAllGroups } from '../../store/group.selectors'

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

  groupTrackBy(_: number, group: Group) {
    return group.id
  }
}
