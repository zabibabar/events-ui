import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectCurrentEvent } from '../../store/event.selectors'

@Component({
  selector: 'app-event-header',
  templateUrl: './event-header.component.html',
  styleUrls: ['./event-header.component.scss']
})
export class EventHeaderComponent {
  event$ = this.store.select(selectCurrentEvent)

  constructor(private store: Store) {}
}
