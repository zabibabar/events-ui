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
  public user$ = this.store.pipe(getUser)
  public isAuthenticated$ = this.store.pipe(isAuthenticated)

  public constructor(private readonly store: Store) {}

  public login() {
    this.store.dispatch(UserAuthActions.signIn({ returnUrl: '/' }))
  }

  public logout() {
    this.store.dispatch(UserAuthActions.signOut())
  }
}
