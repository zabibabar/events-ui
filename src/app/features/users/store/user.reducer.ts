import { Action, ActionReducer, createReducer, on } from '@ngrx/store'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { User } from '../interfaces/user'
import * as UserActions from './user.actions'

export const userFeatureSelector = 'users'

export interface UserStoreState extends EntityState<User> {
  selectedUserId: string | null
  loading: boolean
  error: string | null
}

const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id
})

const initialState: UserStoreState = adapter.getInitialState({
  selectedUserId: null,
  loading: false,
  error: null
})

export const userReducer: ActionReducer<UserStoreState, Action> = createReducer(
  initialState,
  on(UserActions.fetchAllUsersLoading, (state): UserStoreState => ({ ...state, loading: true })),
  on(
    UserActions.fetchAllUsersSuccess,
    (state, { users }): UserStoreState => adapter.upsertMany(users, { ...state, error: null, loading: false })
  ),
  on(UserActions.fetchAllUsersError, (state, { error }): UserStoreState => ({ ...state, error, loading: false })),
  on(UserActions.fetchUserLoading, (state): UserStoreState => ({ ...state, loading: true })),
  on(
    UserActions.fetchUserSuccess,
    (state, { user }): UserStoreState => adapter.upsertOne(user, { ...state, error: null, loading: false })
  ),
  on(UserActions.fetchUserError, (state, { error }): UserStoreState => ({ ...state, error, loading: false })),
  on(UserActions.createUserLoading, (state): UserStoreState => ({ ...state, loading: true })),
  on(
    UserActions.createUserSuccess,
    (state, { user }): UserStoreState => adapter.upsertOne(user, { ...state, error: null, loading: false })
  ),
  on(UserActions.createUserError, (state, { error }): UserStoreState => ({ ...state, error, loading: false })),
  on(UserActions.updateUserLoading, (state): UserStoreState => ({ ...state, loading: true })),
  on(
    UserActions.updateUserSuccess,
    (state, { user }): UserStoreState => adapter.upsertOne(user, { ...state, error: null, loading: false })
  ),
  on(UserActions.updateUserError, (state, { error }): UserStoreState => ({ ...state, error, loading: false })),
  on(UserActions.deleteUserLoading, (state): UserStoreState => ({ ...state, loading: true })),
  on(
    UserActions.deleteUserSuccess,
    (state, { userId }): UserStoreState => adapter.removeOne(userId, { ...state, error: null, loading: false })
  ),
  on(UserActions.deleteUserError, (state, { error }): UserStoreState => ({ ...state, error, loading: false }))
)
