import { Injectable } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { routerNavigatedAction } from '@ngrx/router-store'
import { Store } from '@ngrx/store'
import { forkJoin, of } from 'rxjs'
import { map, exhaustMap, catchError, tap, mergeMap, filter, switchMap } from 'rxjs/operators'
import { selectQueryParam, selectRouteParams } from 'src/app/core/store/router.selectors'
import { DialogType } from 'src/app/shared/dialog/dialog-type.enum'
import { DialogService } from 'src/app/shared/dialog/dialog.service'
import { ToastService } from 'src/app/shared/toast'
import { UploadImageComponent } from 'src/app/shared/upload-image/upload-image'
import { GroupUpsertFormComponent } from '../components/group-upsert-form/group-upsert-form.component'
import { GroupCreateDto } from '../dtos/group-create-dto'
import { GroupUpsertDialogData } from '../interfaces/group-upsert-dialog-data'
import { GroupApiService } from '../services/group-api.service'
import * as GroupActions from './group.actions'
import { selectCurrentGroup, selectGroupById } from './group.selectors'

@Injectable()
export class GroupEffects {
  private groupUpsertFormDialogRef: MatDialogRef<GroupUpsertFormComponent>
  private groupImageUploadDialogRef: MatDialogRef<UploadImageComponent>

  constructor(
    private actions$: Actions,
    private store: Store,
    private groupApiService: GroupApiService,
    private dialog: DialogService,
    private router: Router,
    private toast: ToastService
  ) {}

  fetchAllGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.FetchAllGroupsActions.fetchAllGroups),
      exhaustMap(({ filterOptions }) =>
        this.groupApiService.getAllGroups(filterOptions).pipe(
          map((groups) => GroupActions.FetchAllGroupsActions.fetchAllGroupsSuccess({ groups })),
          catchError((error) => of(GroupActions.FetchAllGroupsActions.fetchAllGroupsError({ error })))
        )
      )
    )
  })

  fetchCurrentGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.FetchCurrentGroup),
      concatLatestFrom(() => this.store.select(selectRouteParams)),
      filter(([, { groupId }]) => !!groupId),
      map(([, { groupId }]) => GroupActions.FetchOneGroupActions.fetchOneGroup({ groupId }))
    )
  })

  fetchOneGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.FetchOneGroupActions.fetchOneGroup),
      exhaustMap(({ groupId }) =>
        this.groupApiService.getGroupById(groupId).pipe(
          map((group) => GroupActions.FetchOneGroupActions.fetchOneGroupSuccess({ group })),
          catchError((error) => of(GroupActions.FetchOneGroupActions.fetchOneGroupError({ error })))
        )
      )
    )
  })

  addToGroupViaInviteCode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter((action) => action.payload.routerState.url.indexOf('join?inviteCode=') > -1),
      concatLatestFrom(() => this.store.select(selectQueryParam('inviteCode'))),
      exhaustMap(([, inviteCode]) =>
        this.groupApiService.addToGroupViaInviteCode(inviteCode ?? '').pipe(
          map((group) => GroupActions.AddToGroupViaInviteCodeActions.addToGroupViaInviteCodeSuccess({ group })),
          tap(({ group }) => this.router.navigate(['/groups', group.id])),
          catchError((error) =>
            of(GroupActions.AddToGroupViaInviteCodeActions.addToGroupViaInviteCodeError({ error }))
          ),
          tap(() => this.router.navigate(['/groups']))
        )
      )
    )
  })

  createGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.CreateGroupActions.createGroup),
      exhaustMap(({ group }) =>
        this.groupApiService.createGroup(group).pipe(
          map((group) => GroupActions.CreateGroupActions.createGroupSuccess({ group })),
          tap(() => this.toast.success('Group Created Successfully!')),
          tap(({ group }) => this.router.navigate(['groups', group.id])),
          catchError((error) =>
            of(GroupActions.CreateGroupActions.createGroupError({ error })).pipe(
              tap(() => this.toast.error('Error Creating Group! Try Again Later'))
            )
          )
        )
      )
    )
  })

  updateGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.UpdateGroupActions.updateGroup),
      mergeMap(({ groupId, group }) =>
        this.groupApiService.updateGroup(groupId, group).pipe(
          map((group) => GroupActions.UpdateGroupActions.updateGroupSuccess({ group })),
          catchError((error) => of(GroupActions.UpdateGroupActions.updateGroupError({ error })))
        )
      )
    )
  })

  deleteGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.DeleteGroupActions.deleteGroup),
      switchMap((action) => {
        const groupDeleteDialogRef = this.dialog.openConfirmationDialog({
          type: 'error',
          title: 'You are about to delete a group?',
          message: 'You will not be able to create new events or add new members to this group',
          primaryCTA: 'Delete Group'
        })

        return forkJoin([of(action), groupDeleteDialogRef.afterClosed()])
      }),
      filter(([, isConfirmed]) => !!isConfirmed),
      mergeMap(([{ groupId }]) =>
        this.groupApiService.deleteGroup(groupId).pipe(
          map(() => GroupActions.DeleteGroupActions.deleteGroupSuccess({ groupId })),
          tap(() => this.toast.success('Group Deleted Successfully!')),
          tap(() => this.router.navigate(['groups'])),
          catchError((error) =>
            of(GroupActions.DeleteGroupActions.deleteGroupError({ error })).pipe(
              tap(() => this.toast.error('Error Deleting Group! Try Again Later'))
            )
          )
        )
      )
    )
  })

  openGroupCreateFormDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(GroupActions.CreateGroupActions.openCreateGroupDialog),
        tap(
          () =>
            (this.groupUpsertFormDialogRef = this.dialog.openForm<GroupUpsertFormComponent, GroupUpsertDialogData>(
              GroupUpsertFormComponent,
              {
                type: DialogType.FORM,
                data: {
                  title: 'Create New Group',
                  submitText: 'Create',
                  onSubmit: (group) =>
                    // eslint-disable-next-line @ngrx/no-dispatch-in-effects
                    this.store.dispatch(GroupActions.CreateGroupActions.createGroup({ group: group as GroupCreateDto }))
                }
              }
            ))
        )
      )
    },
    { dispatch: false }
  )

  openGroupUpdateFormDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(GroupActions.UpdateGroupActions.openUpdateGroupDialog),
        concatLatestFrom(({ groupId }) => this.store.select(selectGroupById({ groupId }))),
        tap(
          ([{ groupId }, group]) =>
            (this.groupUpsertFormDialogRef = this.dialog.openForm<GroupUpsertFormComponent, GroupUpsertDialogData>(
              GroupUpsertFormComponent,
              {
                type: DialogType.FORM,
                data: {
                  group,
                  title: 'Edit Group',
                  submitText: 'Save Changes',
                  onSubmit: (group) =>
                    // eslint-disable-next-line @ngrx/no-dispatch-in-effects
                    this.store.dispatch(GroupActions.UpdateGroupActions.updateGroup({ groupId, group }))
                }
              }
            ))
        )
      )
    },
    { dispatch: false }
  )

  closeGroupUpsertFormDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          GroupActions.CloseUpsertGroupFormDialog,
          GroupActions.CreateGroupActions.createGroupSuccess,
          GroupActions.UpdateGroupActions.updateGroupSuccess
        ),
        tap(() => this.groupUpsertFormDialogRef.close())
      )
    },
    { dispatch: false }
  )

  uploadGroupPicture$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.UploadGroupPictureActions.uploadGroupPicture),
      mergeMap(({ groupId, imageFile }) =>
        this.groupApiService.uploadGroupPicture(groupId, imageFile).pipe(
          map((imageUrl) => GroupActions.UploadGroupPictureActions.uploadGroupPictureSuccess({ groupId, imageUrl })),
          catchError((error) => of(GroupActions.UploadGroupPictureActions.uploadGroupPictureError({ error })))
        )
      )
    )
  })

  openUploadGroupPictureDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(GroupActions.UploadGroupPictureActions.openUploadGroupPictureDialog),
        tap((action) => (this.groupImageUploadDialogRef = this.dialog.openUploadImage(action.data)))
      )
    },
    { dispatch: false }
  )

  closeUploadGroupPictureDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(GroupActions.UploadGroupPictureActions.uploadGroupPictureSuccess),
        tap(() => this.groupImageUploadDialogRef.close())
      )
    },
    { dispatch: false }
  )

  addGroupMember$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.AddGroupMemberActions.addGroupMember),
      concatLatestFrom(() => this.store.select(selectCurrentGroup)),
      filter(([, group]) => !!group),
      map(([{ userId }, group]) => ({ userId, groupId: group?.id as string })),
      mergeMap(({ groupId, userId }) =>
        this.groupApiService.addGroupMember(groupId, userId).pipe(
          map((members) => GroupActions.AddGroupMemberActions.addGroupMemberSuccess({ groupId, members })),
          catchError((error) => of(GroupActions.AddGroupMemberActions.addGroupMemberError({ error })))
        )
      )
    )
  })

  removeGroupMember$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.RemoveGroupMemberActions.removeGroupMember),
      concatLatestFrom(() => this.store.select(selectCurrentGroup)),
      filter(([, group]) => !!group),
      map(([{ userId }, group]) => ({ userId, groupId: group?.id as string })),
      mergeMap(({ userId, groupId }) =>
        this.groupApiService.removeGroupMember(groupId, userId).pipe(
          map((members) => GroupActions.RemoveGroupMemberActions.removeGroupMemberSuccess({ groupId, members })),
          catchError((error) => of(GroupActions.RemoveGroupMemberActions.removeGroupMemberError({ error })))
        )
      )
    )
  })
}
