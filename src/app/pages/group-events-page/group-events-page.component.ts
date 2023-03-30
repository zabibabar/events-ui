import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectEventsByCurrentGroup } from 'src/app/features/events/store/event.selectors'

@Component({
  templateUrl: './group-events-page.component.html',
  styleUrls: ['./group-events-page.component.scss']
})
export class GroupEventsPageComponent {
  events$ = this.store.select(selectEventsByCurrentGroup)

  constructor(private store: Store) {}
}
