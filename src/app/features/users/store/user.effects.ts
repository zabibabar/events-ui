import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { map, exhaustMap, catchError, tap, mergeMap } from 'rxjs/operators'
import { UserApiService } from '../services/user-api.service'
import * as UserActions from './user.actions'

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userApiService: UserApiService) {}

  fetchAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.fetchAllUsers),
      tap({ next: UserActions.fetchAllUsersLoading }),
      exhaustMap(() =>
        this.userApiService.getAllUsers().pipe(
          map((users) => UserActions.fetchAllUsersSuccess({ users })),
          catchError((error) => of(UserActions.fetchAllUsersError({ error })))
        )
      )
    )
  )

  fetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.fetchUser),
      tap({ next: UserActions.fetchUserLoading }),
      exhaustMap(({ userId }) =>
        this.userApiService.getUser(userId).pipe(
          map((user) => UserActions.fetchUserSuccess({ user })),
          catchError((error) => of(UserActions.fetchUserError({ error })))
        )
      )
    )
  )

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      tap({ next: UserActions.createUserLoading }),
      exhaustMap(({ user }) =>
        this.userApiService.createUser(user).pipe(
          map((user) => UserActions.createUserSuccess({ user })),
          catchError((error) => of(UserActions.createUserError({ error })))
        )
      )
    )
  )

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      tap({ next: UserActions.updateUserLoading }),
      mergeMap(({ userId, user }) =>
        this.userApiService.updateUser(userId, user).pipe(
          map((user) => UserActions.updateUserSuccess({ user })),
          catchError((error) => of(UserActions.updateUserError({ error })))
        )
      )
    )
  )

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      tap({ next: UserActions.deleteUserLoading }),
      mergeMap(({ userId }) =>
        this.userApiService.deleteUser(userId).pipe(
          map(() => UserActions.deleteUserSuccess({ userId })),
          catchError((error) => of(UserActions.deleteUserError({ error })))
        )
      )
    )
  )
}
