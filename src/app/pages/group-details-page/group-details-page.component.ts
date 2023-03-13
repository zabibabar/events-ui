import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectCurrentEvent } from 'src/app/features/events/store/event.selectors'

@Component({
  selector: 'app-group-details-page',
  templateUrl: './group-details-page.component.html',
  styleUrls: ['./group-details-page.component.scss']
})
export class GroupDetailsPageComponent {
  currentEvent$ = this.store.select(selectCurrentEvent)

  constructor(private store: Store) {}
}
