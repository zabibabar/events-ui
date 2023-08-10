import { TaskAssignment } from './task-assignment.interface'

export interface Task {
  id: string
  name: string
  assignedTo: TaskAssignment[]
  description?: string
}
