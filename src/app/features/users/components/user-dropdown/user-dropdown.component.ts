import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { UserAuthActions } from '../../store/user.actions'
import { selectIsAuthenticated, selectUser } from '../../store/user.selectors'

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDropdownComponent {
  user$ = this.store.select(selectUser)
  isAuthenticated$ = this.store.select(selectIsAuthenticated)

  constructor(private readonly store: Store) {}

  login() {
    this.store.dispatch(UserAuthActions.signIn({ returnUrl: '/' }))
  }

  logout() {
    this.store.dispatch(UserAuthActions.signOut())
  }
}
