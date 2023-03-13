import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { UserAuthActions } from 'src/app/features/users/store/user.actions'
import { getUser, isAuthenticated } from 'src/app/features/users/store/user.selectors'

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent {
  user$ = this.store.pipe(getUser)
  isAuthenticated$ = this.store.pipe(isAuthenticated)

  constructor(private readonly store: Store) {}

  login() {
    this.store.dispatch(UserAuthActions.signIn({ returnUrl: '/' }))
  }

  logout() {
    this.store.dispatch(UserAuthActions.signOut())
  }
}
