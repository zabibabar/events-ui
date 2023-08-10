import { TaskList } from '../interfaces/task-list.interface'

export type TaskListUpdateDto = Omit<TaskList, 'id' | 'eventId' | 'tasks'>
