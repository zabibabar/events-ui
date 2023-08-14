import { TaskList } from '../interfaces/task-list.interface'

export type TaskListUpdateDto = Partial<Omit<TaskList, 'id' | 'eventId' | 'tasks'>>
