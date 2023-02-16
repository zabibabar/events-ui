import { createFeatureSelector, createSelector } from '@ngrx/store'
import { adapter, groupFeatureSelector, GroupStoreState } from './group.reducer'

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors()

export const selectGroupState = createFeatureSelector<GroupStoreState>(groupFeatureSelector)

export const getSelectedUserId = (state: GroupStoreState) => state.selectedGroupId
export const selectGroupIds = createSelector(selectGroupState, selectIds)
export const selectGroupEntities = createSelector(selectGroupState, selectEntities)
export const selectAllGroups = createSelector(selectGroupState, selectAll)
export const selectGroupTotal = createSelector(selectGroupState, selectTotal)
export const selectCurrentGroupId = createSelector(selectGroupState, getSelectedUserId)

export const selectCurrentGroup = createSelector(
  selectGroupEntities,
  selectCurrentGroupId,
  (groupEntities, groupId) => groupId && groupEntities[groupId]
)
