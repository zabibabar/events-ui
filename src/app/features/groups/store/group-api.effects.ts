import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { routerNavigatedAction } from '@ngrx/router-store'
import { Store } from '@ngrx/store'
import { forkJoin, of } from 'rxjs'
import { map, exhaustMap, catchError, tap, mergeMap, filter } from 'rxjs/operators'
import { selectQueryParam, selectRouteParams } from 'src/app/core/store/router.selectors'
import { ToastService } from 'src/app/shared/toast'
import { GroupApiService } from '../services/group-api.service'
import * as GroupActions from './group.actions'
import { selectCurrentGroup, selectCurrentPage, selectHasMoreGroups } from './group.selectors'
import { EventApiService } from '../../events/services/event-api.service'
import { GROUP_PAGE_SIZE } from '../constants/group-page-size'
import * as GroupLimits from '../constants/group-limits'
import { HomePageLoaded } from 'src/app/core/store/app.actions'

@Injectable()
export class GroupApiEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private groupApiService: GroupApiService,
    private eventApiService: EventApiService,
    private router: Router,
    private toast: ToastService
  ) {}

  homePageLoaded$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HomePageLoaded),
      map(() => GroupActions.FetchGroupsActions.fetchGroups())
    )
  })

  fetchGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.FetchGroupsActions.fetchGroups),
      exhaustMap(() => {
        return this.groupApiService.getGroups({ skip: 0, limit: GroupLimits.GROUPS_FOR_CURRENT_USER }).pipe(
          map((groups) => GroupActions.FetchGroupsActions.fetchGroupsSuccess({ groups })),
          catchError((error) => of(GroupActions.FetchGroupsActions.fetchGroupsError({ error })))
        )
      })
    )
  })

  fetchNextGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.FetchNextGroupsActions.fetchNextGroups),
      concatLatestFrom(() => [this.store.select(selectHasMoreGroups), this.store.select(selectCurrentPage)]),
      filter(([, hasMoreGroups]) => hasMoreGroups),
      exhaustMap(([, , currentPage]) => {
        return this.groupApiService.getGroups({ skip: currentPage * GROUP_PAGE_SIZE, limit: GROUP_PAGE_SIZE }).pipe(
          map((groups) => GroupActions.FetchNextGroupsActions.fetchNextGroupsSuccess({ groups })),
          catchError((error) => of(GroupActions.FetchNextGroupsActions.fetchNextGroupsError({ error })))
        )
      })
    )
  })

  fetchGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.FetchGroupActions.fetchGroup),
      concatLatestFrom(() => this.store.select(selectRouteParams)),
      filter(([, { groupId }]) => !!groupId),
      exhaustMap(([, { groupId }]) =>
        forkJoin([
          this.eventApiService.getEventCountByGroupId(groupId),
          this.groupApiService.getGroupById(groupId)
        ]).pipe(
          map(([count, group]) => GroupActions.FetchGroupActions.fetchGroupSuccess({ group, count })),
          catchError((error) => of(GroupActions.FetchGroupActions.fetchGroupError({ error })))
        )
      )
    )
  })

  addToGroupViaInviteCode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter((action) => action.payload.routerState.url.indexOf('groups/join?inviteCode=') > -1),
      concatLatestFrom(() => this.store.select(selectQueryParam('inviteCode'))),
      exhaustMap(([, inviteCode]) =>
        this.groupApiService.addToGroupViaInviteCode(inviteCode ?? '').pipe(
          concatLatestFrom((group) => this.eventApiService.getEventCountByGroupId(group.id)),
          map(([group, count]) =>
            GroupActions.AddToGroupViaInviteCodeActions.addToGroupViaInviteCodeSuccess({ group, count })
          ),
          tap(() => this.toast.success('Added To Group Successfully!')),
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
          tap(() => this.toast.success('Group Updated Successfully!')),
          catchError((error) => of(GroupActions.UpdateGroupActions.updateGroupError({ error })))
        )
      )
    )
  })

  deleteGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.DeleteGroupActions.deleteGroup),
      mergeMap(({ groupId }) =>
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

  uploadGroupPicture$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.UploadGroupPictureActions.uploadGroupPicture),
      mergeMap(({ groupId, imageFile }) =>
        this.groupApiService.uploadGroupPicture(groupId, imageFile).pipe(
          map((imageUrl) => GroupActions.UploadGroupPictureActions.uploadGroupPictureSuccess({ groupId, imageUrl })),
          tap(() => this.toast.success('Group Picture Updated Successfully!')),
          catchError((error) => of(GroupActions.UploadGroupPictureActions.uploadGroupPictureError({ error })))
        )
      )
    )
  })

  addGroupMember$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.AddGroupMemberActions.addGroupMember),
      concatLatestFrom(() => this.store.select(selectCurrentGroup)),
      filter(([, group]) => !!group),
      map(([{ userId }, group]) => ({ userId, groupId: group?.id as string })),
      mergeMap(({ groupId, userId }) =>
        this.groupApiService.addGroupMember(groupId, userId).pipe(
          map((members) => GroupActions.AddGroupMemberActions.addGroupMemberSuccess({ groupId, members })),
          tap(() => this.toast.success('Group Member Added Successfully!')),
          catchError((error) => of(GroupActions.AddGroupMemberActions.addGroupMemberError({ error })))
        )
      )
    )
  })

  updateGroupMember$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.UpdateGroupMemberActions.updateGroupMember),
      concatLatestFrom(() => this.store.select(selectCurrentGroup)),
      filter(([, group]) => !!group),
      map(([action, group]) => ({ ...action, groupId: group?.id as string })),
      mergeMap(({ userId, groupId, updates }) =>
        this.groupApiService.updateGroupMember(groupId, userId, updates.isOrganizer).pipe(
          map((members) => GroupActions.UpdateGroupMemberActions.updateGroupMemberSuccess({ groupId, members })),
          tap(() => this.toast.success('Group Member Updated Successfully!')),
          catchError((error) => of(GroupActions.UpdateGroupMemberActions.updateGroupMemberError({ error })))
        )
      )
    )
  })

  removeGroupMember$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.RemoveGroupMemberActions.removeGroupMember),
      mergeMap(({ userId, groupId }) =>
        this.groupApiService.removeGroupMember(groupId, userId).pipe(
          map((members) => GroupActions.RemoveGroupMemberActions.removeGroupMemberSuccess({ groupId, members })),
          tap(() => this.toast.success('Left Group Successfully!')),
          tap(() => this.router.navigate(['groups']).then(() => window.location.reload())),
          catchError((error) => of(GroupActions.RemoveGroupMemberActions.removeGroupMemberError({ error })))
        )
      )
    )
  })
}
