import { Injectable } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { map, exhaustMap, catchError, mergeMap, filter, tap } from 'rxjs/operators'
import { DialogType } from 'src/app/shared/dialog/dialog-type.enum'
import { DialogService } from 'src/app/shared/dialog/dialog.service'
import { UploadImageComponent } from 'src/app/shared/upload-image/upload-image'
import { UserUpdateFormComponent } from '../../components/user-update-form/user-update-form.component'
import { UserUpdateDto } from '../../dtos/user-update-dto'
import { User } from '../../interfaces/user'
import { UserUpdateDialogData } from '../../interfaces/user-update-form-dialog'
import { UserApiService } from '../../services/user-api.service'
import {
  CreateUserActions,
  FetchOneUserActions,
  FetchCurrentUserActions,
  UpdateUserActions,
  UploadUserPictureActions,
  CloseUpdateUserFormDialog
} from './user.actions'
import { selectUserById } from './user.selectors'
import { ToastService } from 'src/app/shared/toast'

@Injectable()
export class UserEffects {
  private userUpdateFormDialogRef: MatDialogRef<UserUpdateFormComponent>
  private userImageUploadDialogRef: MatDialogRef<UploadImageComponent>

  constructor(
    private actions$: Actions,
    private store: Store,
    private userApiService: UserApiService,
    private dialog: DialogService,
    private toast: ToastService
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
          tap(() => this.toast.success('User Updated Successfully!')),
          catchError((error) => of(UpdateUserActions.updateUserError({ error })))
        )
      )
    )
  })

  openUserUpdateFormDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UpdateUserActions.openUpdateUserDialog),
        concatLatestFrom(({ userId }) => this.store.select(selectUserById({ userId }))),
        tap(([{ userId }, user]) => {
          this.userUpdateFormDialogRef = this.dialog.open<UserUpdateFormComponent, UserUpdateDialogData>(
            UserUpdateFormComponent,
            {
              type: DialogType.FORM,
              data: {
                user: user as User,
                title: 'Edit Profile',
                submitText: 'Save Changes',
                onSubmit: (user) =>
                  // eslint-disable-next-line @ngrx/no-dispatch-in-effects
                  this.store.dispatch(UpdateUserActions.updateUser({ userId, changes: user as UserUpdateDto }))
              }
            }
          )
        })
      )
    },
    { dispatch: false }
  )

  closeUserUpsertFormDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CloseUpdateUserFormDialog, UpdateUserActions.updateUserSuccess),
        tap(() => this.userUpdateFormDialogRef.close())
      )
    },
    { dispatch: false }
  )

  uploadUserPicture$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UploadUserPictureActions.uploadUserPicture),
      mergeMap(({ userId, imageFile }) =>
        this.userApiService.uploadUserPicture(userId, imageFile).pipe(
          map((imageUrl) => UploadUserPictureActions.uploadUserPictureSuccess({ userId, imageUrl })),
          tap(() => this.toast.success('User Picture Updated Successfully!')),
          catchError((error) => of(UploadUserPictureActions.uploadUserPictureError({ error })))
        )
      )
    )
  })

  openUploadUserPictureDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UploadUserPictureActions.openUploadUserPictureDialog),
        tap((action) => (this.userImageUploadDialogRef = this.dialog.openUploadImage(action.data)))
      )
    },
    { dispatch: false }
  )

  closeUploadUserPictureDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UploadUserPictureActions.uploadUserPictureSuccess),
        tap(() => this.userImageUploadDialogRef.close())
      )
    },
    { dispatch: false }
  )
}
