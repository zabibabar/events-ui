import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { map, Observable } from 'rxjs'
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
    this.events$ = this.store.select(selectAllEvents).pipe(
      map(() => [
        {
          id: '1',
          name: 'Monday Night Trivia',
          group: 'Randos The Group',
          attendees: [],
          address: 'Big Storm Brewing - Clearwater',
          timeStart: new Date('2/25/23 17:00'),
          timeEnd: new Date('2/25/23 22:00')
        },
        {
          id: '2',
          name: 'Friday Soccer',
          group: 'Fowler Fiesta',
          attendees: [],
          address: 'Magnolia Fields - Tampa',
          timeStart: new Date('3/6/23 19:00'),
          timeEnd: new Date('3/6/23 21:00')
        }
      ])
    )
  }

  eventTrackBy(_: number, event: Event) {
    return event.id
  }
}
