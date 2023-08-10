import { TaskList } from '../interfaces/task-list.interface'

export type TaskListCreateDto = Omit<TaskList, 'id' | 'eventId' | 'tasks'>
