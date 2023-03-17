import { Action, ActionReducer, createReducer, on } from '@ngrx/store'
import { UserAuthActions } from './user-auth.actions'

export const userAuthFeatureSelector = 'user-auth'

export interface UserAuthStoreState {
  authenticating: boolean
  authenticated: boolean
}

const initialState: UserAuthStoreState = {
  authenticating: false,
  authenticated: false
}

export const userAuthReducer: ActionReducer<UserAuthStoreState, Action> = createReducer(
  initialState,
  on(UserAuthActions.signIn, (state): UserAuthStoreState => ({ ...state, authenticating: true })),
  on(
    UserAuthActions.signInCompleted,
    (state): UserAuthStoreState => ({ ...state, authenticating: false, authenticated: true })
  ),
  on(
    UserAuthActions.signInFailed,
    (state): UserAuthStoreState => ({ ...state, authenticated: false, authenticating: false })
  ),
  on(
    UserAuthActions.signOutCompleted,
    (state): UserAuthStoreState => ({ ...state, authenticated: false, authenticating: false })
  )
)
