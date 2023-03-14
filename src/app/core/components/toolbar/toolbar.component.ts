import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectUser } from 'src/app/features/users/store/user.selectors'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  user$ = this.store.select(selectUser)

  constructor(private readonly store: Store) {}
}
