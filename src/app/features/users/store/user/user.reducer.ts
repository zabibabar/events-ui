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
import { FetchGroupActions } from 'src/app/features/groups/store/group.actions'

export const userFeatureSelector = 'users'

export interface UserStoreState extends EntityState<User> {
  loading: boolean
  error: string | null
  currentUserId: string | null
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id
})

const initialState: UserStoreState = adapter.getInitialState({
  loading: false,
  error: null,
  currentUserId: null
})

export const userReducer: ActionReducer<UserStoreState, Action> = createReducer(
  initialState,
  on(
    FetchOneUserActions.fetchOneUser,
    FetchCurrentUserActions.fetchCurrentUser,
    CreateUserActions.createUser,
    UpdateUserActions.updateUser,
    UploadUserPictureActions.uploadUserPicture,
    (state): UserStoreState => ({ ...state, loading: true })
  ),
  on(
    FetchOneUserActions.fetchOneUserError,
    FetchCurrentUserActions.fetchCurrentUserError,
    CreateUserActions.createUserError,
    UpdateUserActions.updateUserError,
    UploadUserPictureActions.uploadUserPictureError,
    (state, { error }): UserStoreState => ({ ...state, error, loading: false })
  ),
  on(
    FetchOneUserActions.fetchOneUserSuccess,
    UpdateUserActions.updateUserSuccess,
    (state, { user }): UserStoreState => adapter.upsertOne(user, { ...state, error: null, loading: false })
  ),
  on(
    FetchCurrentUserActions.fetchCurrentUserSuccess,
    CreateUserActions.createUserSuccess,
    (state, { user }): UserStoreState =>
      adapter.upsertOne(user, { ...state, error: null, loading: false, currentUserId: user.id })
  ),
  on(
    UploadUserPictureActions.uploadUserPictureSuccess,
    (state, { userId: id, imageUrl }): UserStoreState =>
      adapter.updateOne({ id, changes: { picture: imageUrl } }, { ...state, error: null, loading: false })
  ),
  on(
    FetchGroupActions.fetchGroupSuccess,
    (state, { group: { members } }): UserStoreState =>
      adapter.upsertMany(members.filter(({ user }) => !!user).map(({ user }) => user) as User[], state)
  )
)
