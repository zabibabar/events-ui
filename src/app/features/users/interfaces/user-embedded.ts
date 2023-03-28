import { User } from './user'

export type UserEmbedded = Pick<User, 'name' | 'picture'>
