import { Injectable } from '@angular/core'
import { AuthService } from '@auth0/auth0-angular'
import { Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { UserAuth } from '../interfaces/user-auth'

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  constructor(private auth0: AuthService) {}

  isAuthenticated(): Observable<boolean> {
    return this.auth0.isAuthenticated$
  }

  loginWithRedirect(appState: { target: string }): void {
    this.auth0.loginWithRedirect({ appState })
  }

  handleRedirectCallback(): Observable<{ target: string }> {
    return this.auth0.handleRedirectCallback().pipe(map((result) => result.appState as { target: string }))
  }

  selectUser(): Observable<UserAuth> {
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
