import { Group } from '../interfaces/group'

export type GroupCreateDTO = Omit<Omit<Group, 'id'>, 'members'>
