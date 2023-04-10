import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectCurrentGroup } from 'src/app/features/groups/store/group.selectors'

@Component({
  selector: 'app-event-group-card',
  templateUrl: './event-group-card.component.html',
  styleUrls: ['./event-group-card.component.scss']
})
export class EventGroupCardComponent {
  group$ = this.store.select(selectCurrentGroup)

  constructor(private store: Store) {}
}
