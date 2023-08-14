import { TaskAssignment } from './task-assignment.interface'

export interface TaskApi {
  id: string
  name: string
  assignedTo: TaskAssignment[]
  description?: string
}
