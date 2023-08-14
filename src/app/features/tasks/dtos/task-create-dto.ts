import { TaskApi } from '../interfaces/task-api.interface'

export type TaskCreateDto = Omit<TaskApi, 'id' | 'assignedTo'>
