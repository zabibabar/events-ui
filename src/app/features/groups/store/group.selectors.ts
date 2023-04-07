import { Dictionary } from '@ngrx/entity'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { selectRouteParam } from 'src/app/core/store/router.selectors'
import { selectCurrentUser } from '../../users/store/user/user.selectors'
import { Group } from '../interfaces/group'
import { adapter, groupFeatureSelector, GroupStoreState } from './group.reducer'

const { selectEntities, selectAll } = adapter.getSelectors()

export const selectGroupState = createFeatureSelector<GroupStoreState>(groupFeatureSelector)

export const selectGroupEntities = createSelector(selectGroupState, selectEntities)
export const selectAllGroups = createSelector(selectGroupState, selectAll)
export const selectCurrentGroup = createSelector(
  selectGroupEntities,
  selectRouteParam('groupId'),
  (groupEntities, groupId) => groupEntities[groupId]
)

export const selectGroupById = (props: { groupId: string }) =>
  createSelector(selectGroupEntities, (groupEntities: Dictionary<Group>) => groupEntities[props.groupId])

export const selectMembersForCurrentGroup = createSelector(
  selectCurrentGroup,
  (group: Group | undefined) => group?.members ?? []
)

export const selectCurrentUserAsGroupMember = createSelector(
  selectCurrentGroup,
  selectCurrentUser,
  (currentGroup, user) => currentGroup?.members.find(({ id }) => user?.id === id)
)

export const selectIsCurrentGroupMemberOrganizer = createSelector(
  selectCurrentGroup,
  selectCurrentUser,
  (currentGroup, user) => currentGroup?.members.find(({ id }) => user?.id === id)?.isOrganizer ?? false
)

export const selectCurrentGroupDescription = createSelector(selectCurrentGroup, (group) => group?.description ?? '')
