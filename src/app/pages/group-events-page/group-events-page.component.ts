import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Event } from 'src/app/features/events/interfaces/event'
import {
  selectPastEventsByCurrentGroup,
  selectUpcomingEventsByCurrentGroup
} from 'src/app/features/events/store/event.selectors'

@Component({
  templateUrl: './group-events-page.component.html',
  styleUrls: ['./group-events-page.component.scss']
})
export class GroupEventsPageComponent {
  isPastPage = this.route.snapshot.data['past'] as boolean
  events$: Observable<Event[]> = this.store.select(
    this.isPastPage ? selectPastEventsByCurrentGroup({ limit: 10 }) : selectUpcomingEventsByCurrentGroup({ limit: 10 })
  )

  constructor(private store: Store, private route: ActivatedRoute) {}
}
