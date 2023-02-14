import { Action, ActionReducer, createReducer, on } from '@ngrx/store'
import { User } from '../interfaces/user'
import { UserAuthActions } from './user.actions'

export const userFeatureSelector = 'users'

export interface UserAuthStoreState {
  authenticating: boolean
  authenticated: boolean
  user?: User
}

const initialState: UserAuthStoreState = {
  authenticating: true,
  authenticated: false
}

export const userAuthReducer: ActionReducer<UserAuthStoreState, Action> = createReducer(
  initialState,
  on(UserAuthActions.signedIn, (state, { user }) => ({
    ...state,
    authenticating: false,
    authenticated: true,
    user
  })),
  on(UserAuthActions.signedOut, () => ({ authenticated: false, authenticating: false })),
  on(UserAuthActions.signInFailed, () => ({ authenticated: false, authenticating: false }))
)
