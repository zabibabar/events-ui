import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { UserAuthService } from '../services/user-auth.service'
import { UserAuthActions } from './user.actions'

@Injectable()
export class UserAuthEffects implements OnInitEffects {
  public readonly signIn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserAuthActions.signIn),
        switchMap((action) => this.userAuthService.loginWithRedirect({ target: action.returnUrl }))
      ),
    { dispatch: false }
  )

  public readonly signInCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAuthActions.signInCompleted),
      switchMap(() =>
        this.userAuthService.getUser().pipe(
          map((user) => UserAuthActions.signedIn({ user })),
          catchError((error) => of(UserAuthActions.signInFailed({ error })))
        )
      )
    )
  )

  public readonly redirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserAuthActions.signInCompleted),
        switchMap((action) => this.router.navigateByUrl(action.state.target, { replaceUrl: true }))
      ),
    { dispatch: false }
  )

  public readonly signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAuthActions.signOut),
      tap(() => {
        try {
          this.userAuthService.logout()
          // eslint-disable-next-line no-empty
        } catch {}
      }),
      map(() => UserAuthActions.signedOut())
    )
  )

  public readonly init$ = createEffect(() =>
    this.actions$.pipe(
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
  )

  public constructor(
    private readonly actions$: Actions,
    private readonly userAuthService: UserAuthService,
    private readonly router: Router
  ) {}

  public ngrxOnInitEffects() {
    return UserAuthActions.init()
  }

  private getAuthResult(auth: boolean) {
    if (auth) {
      return this.userAuthService.getUser().pipe(map((user) => UserAuthActions.signedIn({ user })))
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
}
