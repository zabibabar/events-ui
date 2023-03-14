import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectCurrentUser } from 'src/app/features/users/store/user/user.selectors'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  user$ = this.store.select(selectCurrentUser)

  constructor(private readonly store: Store) {}
}
