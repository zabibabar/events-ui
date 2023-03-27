import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators'
import { UserCreateDto } from '../../dtos/user-create-dto'
import { UserAuth } from '../../interfaces/user-auth'
import { UserAuthService } from '../../services/user-auth.service'
import { CreateUserActions, FetchCurrentUserActions } from '../user/user.actions'
import { UserAuthActions } from './user-auth.actions'

@Injectable()
export class UserAuthEffects implements OnInitEffects {
  constructor(private actions$: Actions, private userAuthService: UserAuthService, private router: Router) {}

  ngrxOnInitEffects() {
    return UserAuthActions.init()
  }

  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAuthActions.init),
      switchMap(() => this.userAuthService.isAuthenticated()),
      map((isLoggedIn) => (isLoggedIn ? UserAuthActions.signInCompleted({}) : UserAuthActions.signOutCompleted())),
      catchError((error) => of(UserAuthActions.signInFailed({ error })))
    )
  })

  signIn$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserAuthActions.signIn),
        tap((action) => this.userAuthService.loginWithRedirect({ target: action.returnUrl }))
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
          map(({ externalId }) => FetchCurrentUserActions.fetchCurrentUser({ externalId }))
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
          map((user) => CreateUserActions.createUser({ user }))
        )
      )
    )
  })

  signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAuthActions.signOut),
      tap(() => this.userAuthService.logout()),
      map(() => UserAuthActions.signOutCompleted())
    )
  })

  private convertUserAuthToUser(userAuth: UserAuth): UserCreateDto {
    const { sub, name, nickname, given_name, family_name, email, picture, locale, email_verified } = userAuth

    return {
      name: (name as string) ?? (nickname as string) ?? `${given_name} ${family_name}`,
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
