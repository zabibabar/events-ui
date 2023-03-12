import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Event } from '../../interfaces/event'
import { selectAllEvents } from '../../store/event.selectors'

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  events$: Observable<Event[]>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.events$ = this.store.select(selectAllEvents)
  }

  eventTrackBy(_: number, event: Event) {
    return event.id
  }
}
