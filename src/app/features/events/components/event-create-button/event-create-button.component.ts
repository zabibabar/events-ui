import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { CreateEventActions } from '../../store/event.actions'

@Component({
  selector: 'app-event-create-button',
  templateUrl: './event-create-button.component.html',
  styleUrls: ['./event-create-button.component.scss']
})
export class EventCreateButtonComponent {
  constructor(private store: Store) {}

  openDialog(): void {
    this.store.dispatch(CreateEventActions.openCreateEventDialog())
  }
}
