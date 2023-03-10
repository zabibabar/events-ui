import { Injectable } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { map, exhaustMap, catchError, tap, mergeMap } from 'rxjs/operators'
import { DialogType } from 'src/app/shared/dialog/dialog-type.enum'
import { DialogService } from 'src/app/shared/dialog/dialog.service'
import { GroupUpsertFormComponent } from '../components/group-upsert-form/group-upsert-form.component'
import { GroupCreateDTO } from '../dtos/group-create-dto'
import { GroupUpsertDialogData } from '../interfaces/group-upsert-dialog-data'
import { GroupApiService } from '../services/group-api.service'
import * as GroupActions from './group.actions'
import { selectGroupById } from './group.selectors'

@Injectable()
export class GroupEffects {
  private groupUpsertFormDialogRef: MatDialogRef<GroupUpsertFormComponent>

  constructor(
    private actions$: Actions,
    private store: Store,
    private groupApiService: GroupApiService,
    private dialog: DialogService
  ) {}

  fetchAllGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.FetchAllGroupsActions.fetchAllGroups),
      tap({ next: GroupActions.FetchAllGroupsActions.fetchAllGroupsLoading }),
      exhaustMap(() =>
        this.groupApiService.getAllGroups().pipe(
          map((groups) => GroupActions.FetchAllGroupsActions.fetchAllGroupsSuccess({ groups })),
          catchError((error) => of(GroupActions.FetchAllGroupsActions.fetchAllGroupsError({ error })))
        )
      )
    )
  })

  createGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.CreateGroupActions.createGroup),
      tap({ next: GroupActions.CreateGroupActions.createGroupLoading }),
      exhaustMap(({ group }) =>
        this.groupApiService.createGroup(group).pipe(
          map((group) => GroupActions.CreateGroupActions.createGroupSuccess({ group })),
          catchError((error) => of(GroupActions.CreateGroupActions.createGroupError({ error })))
        )
      )
    )
  })

  updateGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.UpdateGroupActions.updateGroup),
      tap({ next: GroupActions.UpdateGroupActions.updateGroupLoading }),
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
      tap({ next: GroupActions.DeleteGroupActions.deleteGroupLoading }),
      mergeMap(({ groupId }) =>
        this.groupApiService.deleteGroup(groupId).pipe(
          map(() => GroupActions.DeleteGroupActions.deleteGroupSuccess({ groupId })),
          catchError((error) => of(GroupActions.DeleteGroupActions.deleteGroupError({ error })))
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
            (this.groupUpsertFormDialogRef = this.dialog.open<GroupUpsertFormComponent, GroupUpsertDialogData>(
              GroupUpsertFormComponent,
              {
                type: DialogType.FORM,
                data: {
                  title: 'Create New Group',
                  submitText: 'Create',
                  onSubmit: (group) =>
                    // eslint-disable-next-line @ngrx/no-dispatch-in-effects
                    this.store.dispatch(GroupActions.CreateGroupActions.createGroup({ group: group as GroupCreateDTO }))
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
            (this.groupUpsertFormDialogRef = this.dialog.open<GroupUpsertFormComponent, GroupUpsertDialogData>(
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
        ofType(GroupActions.closeUpsertFormDialog),
        tap(() => this.groupUpsertFormDialogRef.close())
      )
    },
    { dispatch: false }
  )
}
