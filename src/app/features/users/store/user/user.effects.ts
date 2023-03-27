import { Injectable } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { map, exhaustMap, catchError, mergeMap, filter, tap } from 'rxjs/operators'
import { DialogService } from 'src/app/shared/dialog/dialog.service'
import { UploadImageComponent } from 'src/app/shared/upload-image/upload-image'
import { UserApiService } from '../../services/user-api.service'
import {
  CreateUserActions,
  DeleteUserActions,
  FetchOneUserActions,
  FetchCurrentUserActions,
  UpdateUserActions,
  UploadUserPictureActions
} from './user.actions'
import { selectUserById } from './user.selectors'

@Injectable()
export class UserEffects {
  private groupImageUploadDialogRef: MatDialogRef<UploadImageComponent>

  constructor(
    private actions$: Actions,
    private store: Store,
    private userApiService: UserApiService,
    private dialog: DialogService
  ) {}

  fetchOneUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FetchOneUserActions.fetchOneUser),
      concatLatestFrom(({ userId }) => this.store.select(selectUserById({ userId }))),
      filter(([, user]) => !user),
      mergeMap(([{ userId }]) =>
        this.userApiService.getUser(userId).pipe(
          map((user) => FetchOneUserActions.fetchOneUserSuccess({ user })),
          catchError((error) => of(FetchOneUserActions.fetchOneUserError({ error })))
        )
      )
    )
  })

  fetchCurrentUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FetchCurrentUserActions.fetchCurrentUser),
      exhaustMap(({ externalId }) =>
        this.userApiService.getUserByExternalId(externalId).pipe(
          map((user) => FetchCurrentUserActions.fetchCurrentUserSuccess({ user })),
          catchError((error) => of(FetchCurrentUserActions.fetchCurrentUserError({ error })))
        )
      )
    )
  })

  createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CreateUserActions.createUser),
      exhaustMap(({ user }) =>
        this.userApiService.createUser(user).pipe(
          map((user) => CreateUserActions.createUserSuccess({ user })),
          catchError((error) => of(CreateUserActions.createUserError({ error })))
        )
      )
    )
  })

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UpdateUserActions.updateUser),
      mergeMap(({ userId, changes }) =>
        this.userApiService.updateUser(userId, changes).pipe(
          map((user) => UpdateUserActions.updateUserSuccess({ user })),
          catchError((error) => of(UpdateUserActions.updateUserError({ error })))
        )
      )
    )
  })

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeleteUserActions.deleteUser),
      mergeMap(({ userId }) =>
        this.userApiService.deleteUser(userId).pipe(
          map(() => DeleteUserActions.deleteUserSuccess({ userId })),
          catchError((error) => of(DeleteUserActions.deleteUserError({ error })))
        )
      )
    )
  })

  uploadUserPicture$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UploadUserPictureActions.uploadUserPicture),
      mergeMap(({ userId, imageFile }) =>
        this.userApiService.uploadUserPicture(userId, imageFile).pipe(
          map((imageUrl) => UploadUserPictureActions.uploadUserPictureSuccess({ userId, imageUrl })),
          catchError((error) => of(UploadUserPictureActions.uploadUserPictureError({ error })))
        )
      )
    )
  })

  openUploadUserPictureDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UploadUserPictureActions.openUploadUserPictureDialog),
        tap((action) => (this.groupImageUploadDialogRef = this.dialog.openUploadImage(action.data)))
      )
    },
    { dispatch: false }
  )

  closeUploadUserPictureDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UploadUserPictureActions.uploadUserPictureSuccess),
        tap(() => this.groupImageUploadDialogRef.close())
      )
    },
    { dispatch: false }
  )
}
