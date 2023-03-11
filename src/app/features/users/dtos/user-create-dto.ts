import { User } from '../interfaces/user'

export type UserCreateDto = Omit<User, 'id'>
