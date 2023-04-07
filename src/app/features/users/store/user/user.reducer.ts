import { Action, ActionReducer, createReducer, on } from '@ngrx/store'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import {
  FetchOneUserActions,
  FetchCurrentUserActions,
  CreateUserActions,
  UpdateUserActions,
  UploadUserPictureActions
} from './user.actions'
import { User } from '../../interfaces/user'

export const userFeatureSelector = 'users'

export interface UserStoreState extends EntityState<User> {
  loading: boolean
  error: string | null
  currentUserId: string
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id
})

const initialState: UserStoreState = adapter.getInitialState({
  loading: false,
  error: null,
  currentUserId: ''
})

export const userReducer: ActionReducer<UserStoreState, Action> = createReducer(
  initialState,
  on(FetchOneUserActions.fetchOneUser, (state): UserStoreState => ({ ...state, loading: true })),
  on(
    FetchOneUserActions.fetchOneUserSuccess,
    (state, { user }): UserStoreState => adapter.upsertOne(user, { ...state, error: null, loading: false })
  ),
  on(
    FetchOneUserActions.fetchOneUserError,
    (state, { error }): UserStoreState => ({ ...state, error, loading: false })
  ),
  on(FetchCurrentUserActions.fetchCurrentUser, (state): UserStoreState => ({ ...state, loading: true })),
  on(
    FetchCurrentUserActions.fetchCurrentUserSuccess,
    (state, { user }): UserStoreState =>
      adapter.upsertOne(user, { ...state, error: null, loading: false, currentUserId: user.id })
  ),
  on(
    FetchCurrentUserActions.fetchCurrentUserError,
    (state, { error }): UserStoreState => ({ ...state, error, loading: false })
  ),
  on(CreateUserActions.createUser, (state): UserStoreState => ({ ...state, loading: true })),
  on(
    CreateUserActions.createUserSuccess,
    (state, { user }): UserStoreState =>
      adapter.upsertOne(user, { ...state, error: null, loading: false, currentUserId: user.id })
  ),
  on(CreateUserActions.createUserError, (state, { error }): UserStoreState => ({ ...state, error, loading: false })),
  on(UpdateUserActions.updateUser, (state): UserStoreState => ({ ...state, loading: true })),
  on(
    UpdateUserActions.updateUserSuccess,
    (state, { user }): UserStoreState => adapter.upsertOne(user, { ...state, error: null, loading: false })
  ),
  on(UpdateUserActions.updateUserError, (state, { error }): UserStoreState => ({ ...state, error, loading: false })),
  on(UploadUserPictureActions.uploadUserPicture, (state): UserStoreState => ({ ...state, loading: true })),
  on(
    UploadUserPictureActions.uploadUserPictureSuccess,
    (state, { userId: id, imageUrl }): UserStoreState =>
      adapter.updateOne({ id, changes: { picture: imageUrl } }, { ...state, error: null, loading: false })
  ),
  on(
    UploadUserPictureActions.uploadUserPictureError,
    (state, { error }): UserStoreState => ({ ...state, error, loading: false })
  )
)
