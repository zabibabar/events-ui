import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { UserAuthActions } from '../../store/user-auth/user-auth.actions'
import { selectCurrentUser, selectIsAuthenticated } from '../../store/user/user.selectors'

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDropdownComponent {
  user$ = this.store.select(selectCurrentUser)
  isAuthenticated$ = this.store.select(selectIsAuthenticated)

  constructor(private readonly store: Store) {}

  login() {
    this.store.dispatch(UserAuthActions.signIn({ returnUrl: '/' }))
  }

  logout() {
    this.store.dispatch(UserAuthActions.signOut())
  }
}
