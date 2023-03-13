import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Group } from 'src/app/features/groups/interfaces/group'
import { selectGroupById } from 'src/app/features/groups/store/group.selectors'
import { Event } from '../../interfaces/event'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @Input() event: Event

  group$: Observable<Group | undefined>

  constructor(private store: Store) {}

  ngOnInit() {
    this.group$ = this.store.select(selectGroupById({ groupId: this.event.groupId }))
  }
}
