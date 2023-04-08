import { Dictionary } from '@ngrx/entity'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { User } from '../../interfaces/user'
import { adapter, userFeatureSelector, UserStoreState } from './user.reducer'

const { selectEntities } = adapter.getSelectors()

export const selectUserState = createFeatureSelector<UserStoreState>(userFeatureSelector)

export const selectUserEntities = createSelector(selectUserState, selectEntities)
export const selectCurrentUserId = createSelector(selectUserState, (state) => state.currentUserId)
export const selectIsLoading = createSelector(selectUserState, (state) => state.loading)

export const selectCurrentUser = createSelector(
  selectCurrentUserId,
  selectUserEntities,
  (userId, userEntities) => userEntities[userId]
)

export const selectUserById = (props: { userId: string }) =>
  createSelector(selectUserEntities, (userEntities: Dictionary<User>) => userEntities[props.userId])
