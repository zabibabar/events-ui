import { Task } from './task.interface'

export interface TaskList {
  id: string
  eventId: string
  name: string
  tasks: Task[]
}
