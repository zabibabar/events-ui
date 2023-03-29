import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { selectCurrentEventDescription } from '../../store/event.selectors'

@Component({
  selector: 'app-event-description',
  templateUrl: './event-description.component.html',
  styleUrls: ['./event-description.component.scss']
})
export class EventDescriptionComponent {
  description$: Observable<string> = this.store.select(selectCurrentEventDescription)

  constructor(private store: Store) {}
}
