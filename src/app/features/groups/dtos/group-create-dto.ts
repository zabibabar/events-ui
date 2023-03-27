import { Group } from '../interfaces/group'

export type GroupCreateDto = Omit<Omit<Group, 'id'>, 'members'>
