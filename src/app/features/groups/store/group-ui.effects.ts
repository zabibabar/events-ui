/* eslint @ngrx/no-dispatch-in-effects: 0 */
import { Injectable } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { map, tap, filter } from 'rxjs/operators'
import { DialogType } from 'src/app/shared/dialog/dialog-type.enum'
import { DialogService } from 'src/app/shared/dialog/dialog.service'
import { UploadImageComponent } from 'src/app/shared/upload-image/upload-image'
import { GroupUpsertFormComponent } from '../components/group-upsert-form/group-upsert-form.component'
import { GroupCreateDto } from '../dtos/group-create-dto'
import { GroupUpsertDialogData } from '../interfaces/group-upsert-dialog-data'
import { selectCurrentGroup, selectGroupById, selectIsLoadingGroupAction } from './group.selectors'
import { DialogConfirmationComponent } from 'src/app/shared/dialog-confirmation/dialog-confirmation'
import { Group } from '../interfaces/group'
import {
  DeleteGroupActions,
  CloseUpsertGroupFormDialog,
  CreateGroupActions,
  UpdateGroupActions,
  UploadGroupPictureActions,
  RemoveGroupMemberActions
} from './group.actions'

@Injectable()
export class GroupUiEffects {
  private groupUpsertFormDialogRef: MatDialogRef<GroupUpsertFormComponent>
  private groupImageUploadDialogRef: MatDialogRef<UploadImageComponent>
  private confirmationDialogRef: MatDialogRef<DialogConfirmationComponent>

  constructor(private actions$: Actions, private store: Store, private dialog: DialogService) {}

  openGroupCreateFormDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CreateGroupActions.openCreateGroupDialog),
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
                    this.store.dispatch(CreateGroupActions.createGroup({ group: group as GroupCreateDto }))
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
        ofType(UpdateGroupActions.openUpdateGroupDialog),
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
                  onSubmit: (group) => this.store.dispatch(UpdateGroupActions.updateGroup({ groupId, group }))
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
          CloseUpsertGroupFormDialog,
          CreateGroupActions.createGroupSuccess,
          UpdateGroupActions.updateGroupSuccess
        ),
        tap(() => this.groupUpsertFormDialogRef.close())
      )
    },
    { dispatch: false }
  )

  openDeleteGroupDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DeleteGroupActions.openDeleteGroupDialog),
        concatLatestFrom(({ groupId }) => this.store.select(selectGroupById({ groupId }))),
        filter(([, group]) => !!group),
        map(([, group]) => group as Group),
        tap((group) => {
          this.confirmationDialogRef = this.dialog.openConfirmationDialog({
            type: 'error',
            title: 'You are about to delete a group?',
            message: 'You will not be able to create new events or add new members to this group',
            primaryCTA: 'Delete Group',
            onSubmit: () => this.store.dispatch(DeleteGroupActions.deleteGroup({ groupId: group.id })),
            isLoading$: this.store.select(selectIsLoadingGroupAction)
          })
        })
      )
    },
    { dispatch: false }
  )

  openUploadGroupPictureDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UploadGroupPictureActions.openUploadGroupPictureDialog),
        tap((action) => (this.groupImageUploadDialogRef = this.dialog.openUploadImage(action.data)))
      )
    },
    { dispatch: false }
  )

  closeUploadGroupPictureDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UploadGroupPictureActions.uploadGroupPictureSuccess),
        tap(() => this.groupImageUploadDialogRef.close())
      )
    },
    { dispatch: false }
  )

  removeGroupMember$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RemoveGroupMemberActions.openRemoveGroupMemberDialog),
        concatLatestFrom(() => this.store.select(selectCurrentGroup)),
        filter(([action, group]) => !!group),
        map(([{ userId }, group]) => ({ group: group as Group, userId })),
        tap(({ group, userId }) => {
          this.confirmationDialogRef = this.dialog.openConfirmationDialog({
            type: 'error',
            title: `You are about to leave ${group.name}?`,
            message: 'You will not be able to view events in this group anymore!',
            primaryCTA: 'Leave Group',
            onSubmit: () =>
              this.store.dispatch(RemoveGroupMemberActions.removeGroupMember({ groupId: group.id, userId })),
            isLoading$: this.store.select(selectIsLoadingGroupAction)
          })
        })
      )
    },
    { dispatch: false }
  )

  closeConfirmationDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          DeleteGroupActions.deleteGroupError,
          DeleteGroupActions.deleteGroupSuccess,
          RemoveGroupMemberActions.removeGroupMemberError,
          RemoveGroupMemberActions.removeGroupMemberSuccess
        ),
        tap(() => this.confirmationDialogRef.close())
      )
    },
    { dispatch: false }
  )
}
