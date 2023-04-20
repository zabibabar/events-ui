import { Dictionary } from '@ngrx/entity'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { CurrentUser, User } from '../../interfaces/user'
import { adapter, userFeatureSelector, UserStoreState } from './user.reducer'

const { selectEntities } = adapter.getSelectors()

export const selectUserState = createFeatureSelector<UserStoreState>(userFeatureSelector)

export const selectUserEntities = createSelector(selectUserState, selectEntities)
export const selectCurrentUserId = createSelector(selectUserState, (state) => state.currentUserId)
export const selectIsLoadingUserAction = createSelector(selectUserState, (state) => state.loading)

export const selectCurrentUser = createSelector(selectCurrentUserId, selectUserEntities, (userId, userEntities) =>
  userId !== null ? (userEntities[userId] as CurrentUser) : undefined
)

export const selectUserById = (props: { userId: string }) =>
  createSelector(selectUserEntities, (userEntities: Dictionary<User>) => userEntities[props.userId])
