import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store'
import { GroupCreatDto } from '../dtos/group-create-dto'
import { GroupUpdatDto } from '../dtos/group-update-dto'
import { Group } from '../interfaces/group'

export const FetchAllGroupsActions = createActionGroup({
  source: 'Groups',
  events: {
    'Fetch All Groups': emptyProps(),
    'Fetch All Groups Loading': emptyProps(),
    'Fetch All Groups Error': props<{ error: string }>(),
    'Fetch All Groups Success': props<{ groups: Group[] }>()
  }
})

export const FetchOneGroupActions = createActionGroup({
  source: 'Groups',
  events: {
    'Fetch One Group': props<{ groupId: string }>(),
    'Fetch One Group Loading': emptyProps(),
    'Fetch One Group Error': props<{ error: string }>(),
    'Fetch One Group Success': props<{ group: Group }>()
  }
})

export const CreateGroupActions = createActionGroup({
  source: 'Groups',
  events: {
    'Open Create Group Dialog': emptyProps(),
    'Create Group': props<{ group: GroupCreatDto }>(),
    'Create Group Loading': emptyProps(),
    'Create Group Error': props<{ error: string }>(),
    'Create Group Success': props<{ group: Group }>()
  }
})

export const UpdateGroupActions = createActionGroup({
  source: 'Groups',
  events: {
    'Open Update Group Dialog': props<{ groupId: string }>(),
    'Update Group': props<{ groupId: string; group: GroupUpdatDto }>(),
    'Update Group Loading': emptyProps(),
    'Update Group Error': props<{ error: string }>(),
    'Update Group Success': props<{ group: Group }>()
  }
})

export const DeleteGroupActions = createActionGroup({
  source: 'Groups',
  events: {
    'Delete Group': props<{ groupId: string }>(),
    'Delete Group Loading': emptyProps(),
    'Delete Group Error': props<{ error: string }>(),
    'Delete Group Success': props<{ groupId: string }>()
  }
})

export const closeUpsertFormDialog = createAction('[Groups] Close Upsert Form Dialog')
