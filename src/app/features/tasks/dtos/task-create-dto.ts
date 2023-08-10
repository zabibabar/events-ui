import { Task } from '../interfaces/task.interface'

export type TaskCreateDto = Omit<Task, 'id' | 'assignedTo'>
