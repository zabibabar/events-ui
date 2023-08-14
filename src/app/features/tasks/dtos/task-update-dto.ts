import { TaskApi } from '../interfaces/task-api.interface'

export type TaskUpdateDto = Partial<Omit<TaskApi, 'id' | 'assignedTo'>>
