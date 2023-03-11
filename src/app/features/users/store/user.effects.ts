import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators'
import { UserCreateDto } from '../dtos/user-create-dto'
import { UserAuth } from '../interfaces/user-auth'
import { UserApiService } from '../services/user-api.service'
import { UserAuthService } from '../services/user-auth.service'
import { UserAuthActions } from './user.actions'

@Injectable()
export class UserAuthEffects implements OnInitEffects {
  signIn$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserAuthActions.signIn),
        switchMap((action) => this.userAuthService.loginWithRedirect({ target: action.returnUrl }))
      )
    },
    { dispatch: false }
  )

  signInCompletedForExistingUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAuthActions.signInCompleted),
      switchMap(() =>
        this.userAuthService.getUser().pipe(
          filter((user) => !user.is_new),
          map(this.convertUserAuthToUser),
          switchMap(({ externalId }) => this.userApiService.getUser(externalId)),
          map((user) => UserAuthActions.signedIn({ user })),
          catchError((error) => of(UserAuthActions.signInFailed({ error })))
        )
      )
    )
  })

  signInCompletedForNewUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAuthActions.signInCompleted),
      switchMap(() =>
        this.userAuthService.getUser().pipe(
          filter((user) => !!user.is_new),
          map(this.convertUserAuthToUser),
          switchMap((user) => this.userApiService.createUser(user)),
          map((user) => UserAuthActions.signedIn({ user })),
          catchError((error) => of(UserAuthActions.signInFailed({ error })))
        )
      )
    )
  })

  redirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserAuthActions.signInCompleted),
        filter((action) => !!action.state),
        switchMap((action) => this.router.navigateByUrl(action.state?.target ?? '', { replaceUrl: true }))
      )
    },
    { dispatch: false }
  )

  signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAuthActions.signOut),
      tap(() => {
        try {
          this.userAuthService.logout()
          // eslint-disable-next-line no-empty
        } catch {}
      }),
      map(() => UserAuthActions.signedOut())
    )
  })

  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAuthActions.init),
      switchMap(() => {
        const params = window.location.search

        if (params.includes('code=') && params.includes('state=')) {
          return this.completeSignIn()
        } else {
          return this.userAuthService.isAuthenticated().pipe(
            switchMap((auth) => this.getAuthResult(auth)),
            catchError((error) => of(UserAuthActions.signInFailed({ error })))
          )
        }
      })
    )
  })

  constructor(
    private actions$: Actions,
    private userAuthService: UserAuthService,
    private router: Router,
    private userApiService: UserApiService
  ) {}

  ngrxOnInitEffects() {
    return UserAuthActions.init()
  }

  private getAuthResult(auth: boolean) {
    if (auth) {
      return of(UserAuthActions.signInCompleted({}))
    } else {
      return of(UserAuthActions.signedOut())
    }
  }

  private completeSignIn() {
    return this.userAuthService.handleRedirectCallback().pipe(
      map((state) => UserAuthActions.signInCompleted({ state })),
      catchError((error) => of(UserAuthActions.signInFailed({ error })))
    )
  }

  private convertUserAuthToUser(userAuth: UserAuth): UserCreateDto {
    const { sub, name, given_name, family_name, email, picture, locale, email_verified } = userAuth

    return {
      name: name as string,
      email: email as string,
      picture: picture as string,
      locale: locale as string,
      externalId: sub as string,
      firstName: given_name as string,
      lastName: family_name as string,
      emailVerified: email_verified as boolean
    }
  }
}
