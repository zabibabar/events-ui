import { createFeatureSelector, select } from '@ngrx/store'
import { pipe } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { UserAuthStoreState, userFeatureSelector } from './user.reducer'

export const selectUserAuth = createFeatureSelector<UserAuthStoreState>(userFeatureSelector)

export const isAuthenticated = pipe(
  select(selectUserAuth),
  filter((state) => state && !state.authenticating),
  map((state) => state.authenticated)
)

export const getUser = pipe(
  select(selectUserAuth),
  filter((state) => state && !state.authenticating),
  map((state) => state.user)
)
