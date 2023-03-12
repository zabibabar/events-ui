import { Group } from '../interfaces/group'

export type GroupCreatDto = Omit<Omit<Group, 'id'>, 'members'>
