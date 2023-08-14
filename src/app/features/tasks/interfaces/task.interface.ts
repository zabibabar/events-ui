import { TaskApi } from './task-api.interface'

export interface Task extends TaskApi {
  taskListId: string
}
