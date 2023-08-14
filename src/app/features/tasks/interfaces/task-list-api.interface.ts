import { TaskList } from './task-list.interface'
import { Task } from './task.interface'

export interface TaskListApi extends TaskList {
  tasks: Task[]
}
