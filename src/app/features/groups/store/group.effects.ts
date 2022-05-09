import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { map, exhaustMap, catchError, tap, mergeMap } from 'rxjs/operators'
import { GroupApiService } from '../services/group-api.service'
import * as GroupActions from './group.actions'

@Injectable()
export class GroupEffects {
  constructor(private actions$: Actions, private groupApiService: GroupApiService) {}

  fetchAllGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.fetchAllGroups),
      tap({ next: GroupActions.fetchAllGroupsLoading }),
      exhaustMap(() =>
        this.groupApiService.getAllGroups().pipe(
          map((groups) => GroupActions.fetchAllGroupsSuccess({ groups })),
          catchError((error) => of(GroupActions.fetchAllGroupsError({ error })))
        )
      )
    )
  )

  fetchGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.fetchGroup),
      tap({ next: GroupActions.fetchGroupLoading }),
      exhaustMap(({ groupId }) =>
        this.groupApiService.getGroup(groupId).pipe(
          map((group) => GroupActions.fetchGroupSuccess({ group })),
          catchError((error) => of(GroupActions.fetchGroupError({ error })))
        )
      )
    )
  )

  createGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.createGroup),
      tap({ next: GroupActions.createGroupLoading }),
      exhaustMap(({ group }) =>
        this.groupApiService.createGroup(group).pipe(
          map((group) => GroupActions.createGroupSuccess({ group })),
          catchError((error) => of(GroupActions.createGroupError({ error })))
        )
      )
    )
  )

  updateGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.updateGroup),
      tap({ next: GroupActions.updateGroupLoading }),
      mergeMap(({ groupId, group }) =>
        this.groupApiService.updateGroup(groupId, group).pipe(
          map((group) => GroupActions.updateGroupSuccess({ group })),
          catchError((error) => of(GroupActions.updateGroupError({ error })))
        )
      )
    )
  )

  deleteGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.deleteGroup),
      tap({ next: GroupActions.deleteGroupLoading }),
      mergeMap(({ groupId }) =>
        this.groupApiService.deleteGroup(groupId).pipe(
          map(() => GroupActions.deleteGroupSuccess({ groupId })),
          catchError((error) => of(GroupActions.deleteGroupError({ error })))
        )
      )
    )
  )

  addMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.addMembers),
      tap({ next: GroupActions.addMembersLoading }),
      mergeMap(({ groupId, memberIds }) =>
        this.groupApiService.addGroupMembers(groupId, memberIds).pipe(
          map((members) => GroupActions.addMembersSuccess({ members })),
          catchError((error) => of(GroupActions.addMembersError({ error })))
        )
      )
    )
  )

  removeMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.removeMember),
      tap({ next: GroupActions.removeMemberLoading }),
      mergeMap(({ groupId, memberId }) =>
        this.groupApiService.removeGroupMember(groupId, memberId).pipe(
          map(() => GroupActions.removeMemberSuccess({ memberId })),
          catchError((error) => of(GroupActions.removeMemberError({ error })))
        )
      )
    )
  )
}
