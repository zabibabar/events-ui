import { Injectable } from '@angular/core'
import { AuthService } from '@auth0/auth0-angular'
import { Observable } from 'rxjs'
import { filter } from 'rxjs/operators'
import { UserAuth } from '../interfaces/user-auth'

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  constructor(private auth0: AuthService) {}

  isAuthenticated(): Observable<boolean> {
    return this.auth0.isAuthenticated$
  }

  login(): void {
    this.auth0.loginWithRedirect()
  }

  getUser(): Observable<UserAuth> {
    return this.auth0.user$.pipe(filter((u): u is UserAuth => u !== undefined))
  }

  getAccessToken(): Observable<string> {
    return this.auth0.getAccessTokenSilently()
  }

  logout(): void {
    this.auth0.logout({
      logoutParams: { returnTo: location.origin }
    })
  }
}
