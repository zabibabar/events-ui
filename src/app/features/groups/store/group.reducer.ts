import { Action, ActionReducer, createReducer, on } from '@ngrx/store'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { Group } from '../interfaces/group'
import * as GroupActions from './group.actions'

export const groupFeatureSelector = 'groups'

export interface GroupStoreState extends EntityState<Group> {
  loading: boolean
  error: string | null
}

export const adapter: EntityAdapter<Group> = createEntityAdapter<Group>({
  selectId: (group: Group) => group.id
})

const initialState: GroupStoreState = adapter.getInitialState({
  loading: false,
  error: null
})

export const groupReducer: ActionReducer<GroupStoreState, Action> = createReducer(
  initialState,
  on(GroupActions.FetchAllGroupsActions.fetchAllGroups, (state): GroupStoreState => ({ ...state, loading: true })),
  on(
    GroupActions.FetchAllGroupsActions.fetchAllGroupsSuccess,
    (state, { groups }): GroupStoreState => adapter.upsertMany(groups, { ...state, error: null, loading: false })
  ),
  on(
    GroupActions.FetchAllGroupsActions.fetchAllGroupsError,
    (state, { error }): GroupStoreState => ({ ...state, error, loading: false })
  ),
  on(GroupActions.FetchOneGroupActions.fetchOneGroup, (state): GroupStoreState => ({ ...state, loading: true })),
  on(
    GroupActions.FetchOneGroupActions.fetchOneGroupSuccess,
    (state, { group }): GroupStoreState => adapter.upsertOne(group, { ...state, error: null, loading: false })
  ),
  on(
    GroupActions.FetchOneGroupActions.fetchOneGroupError,
    (state, { error }): GroupStoreState => ({ ...state, error, loading: false })
  ),
  on(
    GroupActions.AddToGroupViaInviteCodeActions.addToGroupViaInviteCodeSuccess,
    (state, { group }): GroupStoreState => adapter.upsertOne(group, { ...state, error: null, loading: false })
  ),
  on(
    GroupActions.AddToGroupViaInviteCodeActions.addToGroupViaInviteCodeError,
    (state, { error }): GroupStoreState => ({ ...state, error, loading: false })
  ),
  on(GroupActions.CreateGroupActions.createGroup, (state): GroupStoreState => ({ ...state, loading: true })),
  on(
    GroupActions.CreateGroupActions.createGroupSuccess,
    (state, { group }): GroupStoreState => adapter.upsertOne(group, { ...state, error: null, loading: false })
  ),
  on(
    GroupActions.CreateGroupActions.createGroupError,
    (state, { error }): GroupStoreState => ({ ...state, error, loading: false })
  ),
  on(GroupActions.UpdateGroupActions.updateGroup, (state): GroupStoreState => ({ ...state, loading: true })),
  on(
    GroupActions.UpdateGroupActions.updateGroupSuccess,
    (state, { group }): GroupStoreState => adapter.upsertOne(group, { ...state, error: null, loading: false })
  ),
  on(
    GroupActions.UpdateGroupActions.updateGroupError,
    (state, { error }): GroupStoreState => ({ ...state, error, loading: false })
  ),
  on(GroupActions.DeleteGroupActions.deleteGroup, (state): GroupStoreState => ({ ...state, loading: true })),
  on(
    GroupActions.DeleteGroupActions.deleteGroupSuccess,
    GroupActions.RemoveGroupMemberActions.removeGroupMemberSuccess,
    (state, { groupId }): GroupStoreState => adapter.removeOne(groupId, { ...state, error: null, loading: false })
  ),
  on(
    GroupActions.DeleteGroupActions.deleteGroupError,
    (state, { error }): GroupStoreState => ({ ...state, error, loading: false })
  ),
  on(
    GroupActions.UploadGroupPictureActions.uploadGroupPicture,
    (state): GroupStoreState => ({ ...state, loading: true })
  ),
  on(
    GroupActions.UploadGroupPictureActions.uploadGroupPictureSuccess,
    (state, { groupId: id, imageUrl }): GroupStoreState =>
      adapter.updateOne({ id, changes: { picture: imageUrl } }, { ...state, error: null, loading: false })
  ),
  on(
    GroupActions.UploadGroupPictureActions.uploadGroupPictureError,
    (state, { error }): GroupStoreState => ({ ...state, error, loading: false })
  ),
  on(GroupActions.AddGroupMemberActions.addGroupMember, (state): GroupStoreState => ({ ...state, loading: true })),
  on(
    GroupActions.AddGroupMemberActions.addGroupMemberSuccess,
    (state, { groupId: id, members }): GroupStoreState =>
      adapter.updateOne({ id, changes: { members } }, { ...state, error: null, loading: false })
  ),
  on(
    GroupActions.AddGroupMemberActions.addGroupMemberError,
    (state, { error }): GroupStoreState => ({ ...state, error, loading: false })
  ),
  on(
    GroupActions.UpdateGroupMemberActions.updateGroupMember,
    (state): GroupStoreState => ({ ...state, loading: true })
  ),
  on(
    GroupActions.UpdateGroupMemberActions.updateGroupMemberSuccess,
    (state, { groupId: id, members }): GroupStoreState =>
      adapter.updateOne({ id, changes: { members } }, { ...state, error: null, loading: false })
  ),
  on(
    GroupActions.UpdateGroupMemberActions.updateGroupMemberError,
    (state, { error }): GroupStoreState => ({ ...state, error, loading: false })
  ),
  on(
    GroupActions.RemoveGroupMemberActions.removeGroupMember,
    (state): GroupStoreState => ({ ...state, loading: true })
  ),
  on(
    GroupActions.RemoveGroupMemberActions.removeGroupMemberError,
    (state, { error }): GroupStoreState => ({ ...state, error, loading: false })
  )
)
