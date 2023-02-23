import { createActionGroup, emptyProps, props } from '@ngrx/store'
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

export const CreateGroupActions = createActionGroup({
  source: 'Groups',
  events: {
    'Open Dialog': emptyProps(),
    'Close Dialog': emptyProps(),
    'Create Group': props<{ name: string }>(),
    'Create Group Loading': emptyProps(),
    'Create Group Error': props<{ error: string }>(),
    'Create Group Success': props<{ group: Group }>()
  }
})

export const UpdateGroupActions = createActionGroup({
  source: 'Groups',
  events: {
    'Open Dialog': props<{ group: Group }>(),
    'Close Dialog': emptyProps(),
    'Update Group': props<{ groupId: string; name: string }>(),
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
