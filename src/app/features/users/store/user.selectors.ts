import { createFeatureSelector, createSelector } from '@ngrx/store'
import { UserAuthStoreState, userFeatureSelector } from './user.reducer'

export const selectUserAuth = createFeatureSelector<UserAuthStoreState>(userFeatureSelector)

export const selectUser = createSelector(selectUserAuth, (state) => !state.authenticating && state.user)

export const selectIsAuthenticated = createSelector(
  selectUserAuth,
  (state) => state && !state.authenticating && state.authenticated
)
