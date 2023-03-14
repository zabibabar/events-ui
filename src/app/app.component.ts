import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectCurrentUser } from './features/users/store/user/user.selectors'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'events-ui'

  user$ = this.store.select(selectCurrentUser)

  constructor(private store: Store) {}
}
