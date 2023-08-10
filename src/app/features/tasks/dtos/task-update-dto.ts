import { Task } from '../interfaces/task.interface'

export type TaskUpdateDto = Omit<Task, 'id' | 'assignedTo'>
