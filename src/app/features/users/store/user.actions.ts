import { createAction, props } from '@ngrx/store'
import { User } from '../interfaces/user'

export const fetchAllUsers = createAction('[Users] Fetch All Users')
export const fetchAllUsersLoading = createAction('[Users] Fetch All Users Loading')
export const fetchAllUsersError = createAction('[Users] Fetch All Users Error', props<{ error: string }>())
export const fetchAllUsersSuccess = createAction('[Users Page] Fetch All Users Success', props<{ users: User[] }>())

export const fetchUser = createAction('[Users] Fetch User', props<{ userId: string }>())
export const fetchUserLoading = createAction('[Users] Fetch User Loading')
export const fetchUserError = createAction('[Users] Fetch User Error', props<{ error: string }>())
export const fetchUserSuccess = createAction('[User Page] Fetch User Success', props<{ user: User }>())

export const createUser = createAction('[Users] Create User', props<{ user: User }>())
export const createUserLoading = createAction('[Users] Create User Loading')
export const createUserError = createAction('[Users] Create User Error', props<{ error: string }>())
export const createUserSuccess = createAction('[User Page] Create User Success', props<{ user: User }>())

export const updateUser = createAction('[Users] Update User', props<{ userId: string; user: User }>())
export const updateUserLoading = createAction('[Users] Update User Loading')
export const updateUserError = createAction('[Users] Update User Error', props<{ error: string }>())
export const updateUserSuccess = createAction('[User Page] Update User Success', props<{ user: User }>())

export const deleteUser = createAction('[Users] Delete User', props<{ userId: string }>())
export const deleteUserLoading = createAction('[Users] Delete User Loading')
export const deleteUserError = createAction('[Users] Delete User Error', props<{ error: string }>())
export const deleteUserSuccess = createAction('[User Page] Delete User Success', props<{ userId: string }>())
