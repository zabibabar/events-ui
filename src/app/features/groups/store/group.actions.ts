import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store'
import { UploadImageData } from 'src/app/shared/upload-image/upload-image-data'
import { GroupCreateDto } from '../dtos/group-create-dto'
import { GroupUpdateDto } from '../dtos/group-update-dto'
import { Group } from '../interfaces/group'
import { Member } from '../interfaces/member'
import { EventCountResponseDTO } from '../../events/dtos/event-count-response.dto'

export const FetchGroupsActions = createActionGroup({
  source: 'Groups',
  events: {
    'Fetch Groups': emptyProps(),
    'Fetch Groups Error': props<{ error: string }>(),
    'Fetch Groups Success': props<{ groups: Group[] }>()
  }
})

export const FetchNextGroupsActions = createActionGroup({
  source: 'Groups',
  events: {
    'Fetch Next Groups': emptyProps(),
    'Fetch Next Groups Error': props<{ error: string }>(),
    'Fetch Next Groups Success': props<{ groups: Group[] }>()
  }
})

export const FetchGroupActions = createActionGroup({
  source: 'Groups',
  events: {
    'Fetch Group': emptyProps(),
    'Fetch Group Error': props<{ error: string }>(),
    'Fetch Group Success': props<{ group: Group; count: EventCountResponseDTO }>()
  }
})

export const CreateGroupActions = createActionGroup({
  source: 'Groups',
  events: {
    'Open Create Group Dialog': emptyProps(),
    'Create Group': props<{ group: GroupCreateDto }>(),
    'Create Group Error': props<{ error: string }>(),
    'Create Group Success': props<{ group: Group }>()
  }
})

export const UpdateGroupActions = createActionGroup({
  source: 'Groups',
  events: {
    'Open Update Group Dialog': props<{ groupId: string }>(),
    'Update Group': props<{ groupId: string; group: GroupUpdateDto }>(),
    'Update Group Error': props<{ error: string }>(),
    'Update Group Success': props<{ group: Group }>()
  }
})

export const DeleteGroupActions = createActionGroup({
  source: 'Groups',
  events: {
    'Open Delete Group Dialog': props<{ groupId: string }>(),
    'Delete Group': props<{ groupId: string }>(),
    'Delete Group Error': props<{ error: string }>(),
    'Delete Group Success': props<{ groupId: string }>()
  }
})

export const AddToGroupViaInviteCodeActions = createActionGroup({
  source: 'Groups',
  events: {
    'Add to Group Via Invite Code Error': props<{ error: string }>(),
    'Add to Group Via Invite Code Success': props<{ group: Group; count: EventCountResponseDTO }>()
  }
})

export const UploadGroupPictureActions = createActionGroup({
  source: 'Groups',
  events: {
    'Open Upload Group Picture Dialog': props<{ data: UploadImageData }>(),
    'Upload Group Picture': props<{ groupId: string; imageFile: File }>(),
    'Upload Group Picture Error': props<{ error: string }>(),
    'Upload Group Picture Success': props<{ groupId: string; imageUrl: string }>()
  }
})

export const AddGroupMemberActions = createActionGroup({
  source: 'Group Members',
  events: {
    'Add Group Member': props<{ groupId: string; userId: string }>(),
    'Add Group Member Error': props<{ error: string }>(),
    'Add Group Member Success': props<{ groupId: string; members: Member[] }>()
  }
})

export const RemoveGroupMemberActions = createActionGroup({
  source: 'Group Members',
  events: {
    'Open Remove Group Member Dialog': props<{ userId: string }>(),
    'Remove Group Member': props<{ groupId: string; userId: string }>(),
    'Remove Group Member Error': props<{ error: string }>(),
    'Remove Group Member Success': props<{ groupId: string; members: Member[] }>()
  }
})

export const UpdateGroupMemberActions = createActionGroup({
  source: 'Group Members',
  events: {
    'Update Group Member': props<{ userId: string; updates: { isOrganizer: boolean } }>(),
    'Update Group Member Error': props<{ error: string }>(),
    'Update Group Member Success': props<{ groupId: string; members: Member[] }>()
  }
})

export const CloseUpsertGroupFormDialog = createAction('[Groups] Close Upsert Group Form Dialog')
