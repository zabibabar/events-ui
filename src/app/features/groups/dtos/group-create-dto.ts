import { Group } from '../interfaces/group'

export type GroupCreatedto = Omit<Omit<Group, 'id'>, 'members'>
