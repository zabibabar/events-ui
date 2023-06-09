import { CurrentUser } from '../interfaces/user'

export type UserCreateDto = Omit<CurrentUser, 'id'> & { firstName: string; lastName: string }
