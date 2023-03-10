import { Injectable } from '@angular/core'
import { Auth0Client } from '@auth0/auth0-spa-js'
import { EMPTY, from, Observable } from 'rxjs'
import { filter, map, switchMap } from 'rxjs/operators'
import { User } from '../interfaces/user'
import { UserAuth } from '../interfaces/user-auth'
import { UserAuthConfig } from '../interfaces/user-auth-config'

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private readonly auth0: Auth0Client

  public constructor(private readonly config: UserAuthConfig) {
    this.auth0 = new Auth0Client({
      clientId: config.clientId,
      authorizationParams: {
        audience: config.audience,
        redirect_uri: config.redirectUri ?? location.origin,
        scope: config.scope
      },
      domain: config.domain,
      useRefreshTokens: config.useRefreshTokens,
      sessionCheckExpiryDays: config.sessionCheckExpiryDays
    })
  }

  public isAuthenticated(): Observable<boolean> {
    return from(this.checkSession())
  }

  public loginWithRedirect(appState: { target: string }): Observable<never> {
    return from(this.auth0.loginWithRedirect({ appState })).pipe(switchMap(() => EMPTY))
  }

  public handleRedirectCallback(): Observable<{ target: string }> {
    return from(this.auth0.handleRedirectCallback()).pipe(map((result) => result.appState as { target: string }))
  }

  public getUser(): Observable<User> {
    return from(this.auth0.getUser()).pipe(
      filter((u): u is UserAuth => u !== undefined),
      map(this.convertUserAuthToUser)
    )
  }

  public getAccessToken(): Observable<string> {
    return from(this.auth0.getTokenSilently())
  }

  public logout(): void {
    this.auth0.logout({
      logoutParams: { returnTo: this.config.logoutUri ?? location.origin }
    })
  }

  private async checkSession(): Promise<boolean> {
    await this.auth0.checkSession()

    return await this.auth0.isAuthenticated()
  }

  private convertUserAuthToUser(userAuth: UserAuth): User {
    const { sub, name, given_name, family_name, email, picture, locale, email_verified, is_new } = userAuth

    return {
      name: name as string,
      email: email as string,
      picture: picture as string,
      locale: locale as string,
      id: sub as string,
      firstName: given_name as string,
      lastName: family_name as string,
      isNew: is_new as boolean,
      emailVerified: email_verified as boolean
    }
  }
}
