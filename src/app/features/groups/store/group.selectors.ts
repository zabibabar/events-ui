import { Dictionary } from '@ngrx/entity'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { selectRouteParam } from 'src/app/core/store/router.selectors'
import { Group } from '../interfaces/group'
import { adapter, groupFeatureSelector, GroupStoreState } from './group.reducer'

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors()

export const selectGroupState = createFeatureSelector<GroupStoreState>(groupFeatureSelector)

export const selectGroupIds = createSelector(selectGroupState, selectIds)
export const selectGroupEntities = createSelector(selectGroupState, selectEntities)
export const selectAllGroups = createSelector(selectGroupState, selectAll)
export const selectGroupTotal = createSelector(selectGroupState, selectTotal)
export const selectCurrentGroup = createSelector(
  selectGroupEntities,
  selectRouteParam('groupId'),
  (groupEntities, groupId) => groupEntities[groupId]
)

export const selectGroupById = (props: { groupId: string }) =>
  createSelector(selectGroupEntities, (groupEntities: Dictionary<Group>) => groupEntities[props.groupId])
