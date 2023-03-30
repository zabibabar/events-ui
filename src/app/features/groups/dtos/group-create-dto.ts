import { Group } from '../interfaces/group'

export type GroupCreateDto = Omit<Group, 'id' | 'members'>
