import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core'
import { Event } from '../../interfaces/event'
import { Store } from '@ngrx/store'
import { selectIsLoadingEventAction } from '../../store/event.selectors'

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventListComponent {
  @Input() events: Event[] = []
  @Input() showMoreOption = false
  @Output() next = new EventEmitter<void>()

  loading$ = this.store.select(selectIsLoadingEventAction)

  constructor(private store: Store) {}

  eventTrackBy(_: number, event: Event) {
    return event.id
  }

  fetchNextEvents(): void {
    this.next.emit()
  }
}
