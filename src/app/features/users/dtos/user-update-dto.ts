import { UserCreateDto } from './user-create-dto'

export type UserUpdateDto = Omit<UserCreateDto, 'externalId' | 'picture'>
