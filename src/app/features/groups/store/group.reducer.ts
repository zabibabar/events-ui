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
  selectedGroupId: null,
  loading: false,
  error: null
})

export const groupReducer: ActionReducer<GroupStoreState, Action> = createReducer(
  initialState,
  on(
    GroupActions.FetchAllGroupsActions.fetchAllGroupsLoading,
    (state): GroupStoreState => ({ ...state, loading: true })
  ),
  on(
    GroupActions.FetchAllGroupsActions.fetchAllGroupsSuccess,
    (state, { groups }): GroupStoreState => adapter.upsertMany(groups, { ...state, error: null, loading: false })
  ),
  on(
    GroupActions.FetchAllGroupsActions.fetchAllGroupsError,
    (state, { error }): GroupStoreState => ({ ...state, error, loading: false })
  ),
  on(GroupActions.CreateGroupActions.createGroupLoading, (state): GroupStoreState => ({ ...state, loading: true })),
  on(
    GroupActions.CreateGroupActions.createGroupSuccess,
    (state, { group }): GroupStoreState => adapter.upsertOne(group, { ...state, error: null, loading: false })
  ),
  on(
    GroupActions.CreateGroupActions.createGroupError,
    (state, { error }): GroupStoreState => ({ ...state, error, loading: false })
  ),
  on(GroupActions.UpdateGroupActions.updateGroupLoading, (state): GroupStoreState => ({ ...state, loading: true })),
  on(
    GroupActions.UpdateGroupActions.updateGroupSuccess,
    (state, { group }): GroupStoreState => adapter.upsertOne(group, { ...state, error: null, loading: false })
  ),
  on(
    GroupActions.UpdateGroupActions.updateGroupError,
    (state, { error }): GroupStoreState => ({ ...state, error, loading: false })
  ),
  on(GroupActions.DeleteGroupActions.deleteGroupLoading, (state): GroupStoreState => ({ ...state, loading: true })),
  on(
    GroupActions.DeleteGroupActions.deleteGroupSuccess,
    (state, { groupId }): GroupStoreState => adapter.removeOne(groupId, { ...state, error: null, loading: false })
  ),
  on(
    GroupActions.DeleteGroupActions.deleteGroupError,
    (state, { error }): GroupStoreState => ({ ...state, error, loading: false })
  )
)
