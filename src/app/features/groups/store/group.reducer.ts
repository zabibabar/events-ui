import { Action, ActionReducer, createReducer, on } from '@ngrx/store'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { Group } from '../interfaces/group'
import * as GroupActions from './group.actions'
import { GROUP_PAGE_SIZE } from '../constants/group-page-size'
import * as GroupLimits from '../constants/group-limits'

export const groupFeatureSelector = 'groups'

export interface GroupStoreState extends EntityState<Group> {
  loading: boolean
  error: string | null
  currentGroupUpcomingEventCount?: number
  currentGroupPastEventCount?: number
  hasMoreGroups: boolean
  currentPage: number
}

export const adapter: EntityAdapter<Group> = createEntityAdapter<Group>({
  selectId: (group: Group) => group.id
})

const initialState: GroupStoreState = adapter.getInitialState({
  loading: false,
  error: null,
  hasMoreGroups: true,
  currentPage: 0
})

export const groupReducer: ActionReducer<GroupStoreState, Action> = createReducer(
  initialState,
  on(
    GroupActions.FetchGroupsActions.fetchGroups,
    GroupActions.FetchNextGroupsActions.fetchNextGroups,
    GroupActions.FetchGroupActions.fetchGroup,
    GroupActions.CreateGroupActions.createGroup,
    GroupActions.UpdateGroupActions.updateGroup,
    GroupActions.DeleteGroupActions.deleteGroup,
    GroupActions.UploadGroupPictureActions.uploadGroupPicture,
    GroupActions.AddGroupMemberActions.addGroupMember,
    GroupActions.RemoveGroupMemberActions.removeGroupMember,
    GroupActions.UpdateGroupMemberActions.updateGroupMember,
    (state): GroupStoreState => ({ ...state, loading: true })
  ),
  on(
    GroupActions.FetchGroupsActions.fetchGroupsError,
    GroupActions.FetchNextGroupsActions.fetchNextGroupsError,
    GroupActions.FetchGroupActions.fetchGroupError,
    GroupActions.CreateGroupActions.createGroupError,
    GroupActions.UpdateGroupActions.updateGroupError,
    GroupActions.DeleteGroupActions.deleteGroupError,
    GroupActions.UploadGroupPictureActions.uploadGroupPictureError,
    GroupActions.AddGroupMemberActions.addGroupMemberError,
    GroupActions.RemoveGroupMemberActions.removeGroupMemberError,
    GroupActions.UpdateGroupMemberActions.updateGroupMemberError,
    (state): GroupStoreState => ({ ...state, loading: true })
  ),
  on(
    GroupActions.FetchGroupsActions.fetchGroupsSuccess,
    (state, { groups }): GroupStoreState =>
      adapter.upsertMany(groups, {
        ...state,
        error: null,
        loading: false,
        hasMoreGroups: groups.length === GroupLimits.GROUPS_FOR_CURRENT_USER
      })
  ),
  on(
    GroupActions.FetchNextGroupsActions.fetchNextGroupsSuccess,
    (state, { groups }): GroupStoreState =>
      adapter.upsertMany(groups, {
        ...state,
        error: null,
        loading: false,
        hasMoreGroups: groups.length === GROUP_PAGE_SIZE,
        currentPage: groups.length === 0 && state.currentPage !== 0 ? state.currentPage : state.currentPage + 1
      })
  ),
  on(
    GroupActions.FetchGroupActions.fetchGroupSuccess,
    GroupActions.AddToGroupViaInviteCodeActions.addToGroupViaInviteCodeSuccess,
    (state, { group, count }): GroupStoreState =>
      adapter.upsertOne(group, {
        ...state,
        error: null,
        loading: false,
        currentGroupUpcomingEventCount: count.upcoming,
        currentGroupPastEventCount: count.past
      })
  ),
  on(
    GroupActions.CreateGroupActions.createGroupSuccess,
    GroupActions.UpdateGroupActions.updateGroupSuccess,
    (state, { group }): GroupStoreState => adapter.upsertOne(group, { ...state, error: null, loading: false })
  ),
  on(
    GroupActions.DeleteGroupActions.deleteGroupSuccess,
    GroupActions.RemoveGroupMemberActions.removeGroupMemberSuccess,
    (state, { groupId }): GroupStoreState => adapter.removeOne(groupId, { ...state, error: null, loading: false })
  ),
  on(
    GroupActions.UploadGroupPictureActions.uploadGroupPictureSuccess,
    (state, { groupId: id, imageUrl }): GroupStoreState =>
      adapter.updateOne({ id, changes: { picture: imageUrl } }, { ...state, error: null, loading: false })
  ),
  on(
    GroupActions.AddGroupMemberActions.addGroupMemberSuccess,
    GroupActions.UpdateGroupMemberActions.updateGroupMemberSuccess,
    GroupActions.RemoveGroupMemberActions.removeGroupMemberSuccess,
    (state, { groupId: id, members }): GroupStoreState =>
      adapter.updateOne({ id, changes: { members } }, { ...state, error: null, loading: false })
  )
)
