import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { FetchEventsByCurrentGroupActions } from 'src/app/features/events/store/event.actions'
import { selectEventsByCurrentGroup } from 'src/app/features/events/store/event.selectors'

@Component({
  selector: 'app-group-events-page',
  templateUrl: './group-events-page.component.html',
  styleUrls: ['./group-events-page.component.scss']
})
export class GroupEventsPageComponent {
  events$ = this.store.select(selectEventsByCurrentGroup)

  constructor(private store: Store) {
    this.store.dispatch(FetchEventsByCurrentGroupActions.fetchEventsByCurrentGroup())
  }
}
