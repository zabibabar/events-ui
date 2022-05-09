import { Action, ActionReducer, createReducer, on } from '@ngrx/store'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { Group } from '../interfaces/group'
import * as GroupActions from './group.actions'

export const groupFeatureSelector = 'groups'

export interface GroupStoreState extends EntityState<Group> {
  selectedGroupId: string | null
  loading: boolean
  error: string | null
}

const adapter: EntityAdapter<Group> = createEntityAdapter<Group>({
  selectId: (group: Group) => group.id
})

const initialState: GroupStoreState = adapter.getInitialState({
  selectedGroupId: null,
  loading: false,
  error: null
})

export const groupReducer: ActionReducer<GroupStoreState, Action> = createReducer(
  initialState,
  on(GroupActions.fetchAllGroupsLoading, (state): GroupStoreState => ({ ...state, loading: true })),
  on(
    GroupActions.fetchAllGroupsSuccess,
    (state, { groups }): GroupStoreState => adapter.upsertMany(groups, { ...state, error: null, loading: false })
  ),
  on(GroupActions.fetchAllGroupsError, (state, { error }): GroupStoreState => ({ ...state, error, loading: false })),
  on(GroupActions.fetchGroupLoading, (state): GroupStoreState => ({ ...state, loading: true })),
  on(
    GroupActions.fetchGroupSuccess,
    (state, { group }): GroupStoreState => adapter.upsertOne(group, { ...state, error: null, loading: false })
  ),
  on(GroupActions.fetchGroupError, (state, { error }): GroupStoreState => ({ ...state, error, loading: false })),
  on(GroupActions.createGroupLoading, (state): GroupStoreState => ({ ...state, loading: true })),
  on(
    GroupActions.createGroupSuccess,
    (state, { group }): GroupStoreState => adapter.upsertOne(group, { ...state, error: null, loading: false })
  ),
  on(GroupActions.createGroupError, (state, { error }): GroupStoreState => ({ ...state, error, loading: false })),
  on(GroupActions.updateGroupLoading, (state): GroupStoreState => ({ ...state, loading: true })),
  on(
    GroupActions.updateGroupSuccess,
    (state, { group }): GroupStoreState => adapter.upsertOne(group, { ...state, error: null, loading: false })
  ),
  on(GroupActions.updateGroupError, (state, { error }): GroupStoreState => ({ ...state, error, loading: false })),
  on(GroupActions.deleteGroupLoading, (state): GroupStoreState => ({ ...state, loading: true })),
  on(
    GroupActions.deleteGroupSuccess,
    (state, { groupId }): GroupStoreState => adapter.removeOne(groupId, { ...state, error: null, loading: false })
  ),
  on(GroupActions.deleteGroupError, (state, { error }): GroupStoreState => ({ ...state, error, loading: false }))
)
