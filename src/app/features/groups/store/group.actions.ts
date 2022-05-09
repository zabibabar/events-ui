import { createAction, props } from '@ngrx/store'
import { Member } from '../interfaces/member'
import { Group } from '../interfaces/group'

export const fetchAllGroups = createAction('[Groups] Fetch All Groups')
export const fetchAllGroupsLoading = createAction('[Groups] Fetch All Groups Loading')
export const fetchAllGroupsError = createAction('[Groups] Fetch All Groups Error', props<{ error: string }>())
export const fetchAllGroupsSuccess = createAction(
  '[Groups Page] Fetch All Groups Success',
  props<{ groups: Group[] }>()
)

export const fetchGroup = createAction('[Groups] Fetch Group', props<{ groupId: string }>())
export const fetchGroupLoading = createAction('[Groups] Fetch Group Loading')
export const fetchGroupError = createAction('[Groups] Fetch Group Error', props<{ error: string }>())
export const fetchGroupSuccess = createAction('[Group Page] Fetch Group Success', props<{ group: Group }>())

export const createGroup = createAction('[Groups] Create Group', props<{ group: Group }>())
export const createGroupLoading = createAction('[Groups] Create Group Loading')
export const createGroupError = createAction('[Groups] Create Group Error', props<{ error: string }>())
export const createGroupSuccess = createAction('[Group Page] Create Group Success', props<{ group: Group }>())

export const updateGroup = createAction('[Groups] Update Group', props<{ groupId: string; group: Group }>())
export const updateGroupLoading = createAction('[Groups] Update Group Loading')
export const updateGroupError = createAction('[Groups] Update Group Error', props<{ error: string }>())
export const updateGroupSuccess = createAction('[Group Page] Update Group Success', props<{ group: Group }>())

export const deleteGroup = createAction('[Groups] Delete Group', props<{ groupId: string }>())
export const deleteGroupLoading = createAction('[Groups] Delete Group Loading')
export const deleteGroupError = createAction('[Groups] Delete Group Error', props<{ error: string }>())
export const deleteGroupSuccess = createAction('[Group Page] Delete Group Success', props<{ groupId: string }>())

export const addMembers = createAction('[Groups] Add Member', props<{ groupId: string; memberIds: string[] }>())
export const addMembersLoading = createAction('[Groups] Add Member Loading')
export const addMembersError = createAction('[Groups] Add Member Error', props<{ error: string }>())
export const addMembersSuccess = createAction('[Group Page] Add Member Success', props<{ members: Member[] }>())

export const removeMember = createAction('[Groups] Remove Member', props<{ groupId: string; memberId: string }>())
export const removeMemberLoading = createAction('[Groups] Remove Member Loading')
export const removeMemberError = createAction('[Groups] Remove Member Error', props<{ error: string }>())
export const removeMemberSuccess = createAction('[Group Page] Remove Member Success', props<{ memberId: string }>())
