import { Injectable } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { map, exhaustMap, catchError, tap, mergeMap } from 'rxjs/operators'
import { GroupCreateFormComponent } from '../components/group-create-form/group-create-form.component'
import { GroupApiService } from '../services/group-api.service'
import * as GroupActions from './group.actions'

@Injectable()
export class GroupEffects {
  private groupCreateFormDialogRef: MatDialogRef<GroupCreateFormComponent>

  constructor(private actions$: Actions, private groupApiService: GroupApiService, private dialog: MatDialog) {}

  fetchAllGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.FetchAllGroupsActions.fetchAllGroups),
      tap({ next: GroupActions.FetchAllGroupsActions.fetchAllGroupsLoading }),
      exhaustMap(() =>
        this.groupApiService.getAllGroups().pipe(
          map((groups) => GroupActions.FetchAllGroupsActions.fetchAllGroupsSuccess({ groups })),
          catchError((error) => of(GroupActions.FetchAllGroupsActions.fetchAllGroupsError({ error })))
        )
      )
    )
  )

  createGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.CreateGroupActions.createGroup),
      tap({ next: GroupActions.CreateGroupActions.createGroupLoading }),
      exhaustMap(({ name }) =>
        this.groupApiService.createGroup({ name }).pipe(
          map((group) => GroupActions.CreateGroupActions.createGroupSuccess({ group })),
          catchError((error) => of(GroupActions.CreateGroupActions.createGroupError({ error })))
        )
      )
    )
  )

  updateGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.UpdateGroupActions.updateGroup),
      tap({ next: GroupActions.UpdateGroupActions.updateGroupLoading }),
      mergeMap(({ groupId, name }) =>
        this.groupApiService.updateGroup(groupId, { name }).pipe(
          map((group) => GroupActions.UpdateGroupActions.updateGroupSuccess({ group })),
          catchError((error) => of(GroupActions.UpdateGroupActions.updateGroupError({ error })))
        )
      )
    )
  )

  deleteGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.DeleteGroupActions.deleteGroup),
      tap({ next: GroupActions.DeleteGroupActions.deleteGroupLoading }),
      mergeMap(({ groupId }) =>
        this.groupApiService.deleteGroup(groupId).pipe(
          map(() => GroupActions.DeleteGroupActions.deleteGroupSuccess({ groupId })),
          catchError((error) => of(GroupActions.DeleteGroupActions.deleteGroupError({ error })))
        )
      )
    )
  )

  openGroupCreateFormDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GroupActions.CreateGroupActions.openDialog),
        tap(() => (this.groupCreateFormDialogRef = this.dialog.open(GroupCreateFormComponent)))
      ),
    { dispatch: false }
  )

  closeGroupCreateFormDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GroupActions.CreateGroupActions.closeDialog),
        tap(() => this.groupCreateFormDialogRef.close())
      ),
    { dispatch: false }
  )
}
