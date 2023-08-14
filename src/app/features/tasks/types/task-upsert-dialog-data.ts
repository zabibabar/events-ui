import { TaskCreateDto } from '../dtos/task-create-dto'
import { TaskUpdateDto } from '../dtos/task-update-dto'
import { Task } from '../interfaces/task.interface'

export type TaskUpsertDialogData =
  | {
      title: string
      submitText: string
    } & (
      | { type: 'create'; onSubmit: (task: TaskCreateDto) => void }
      | { type: 'update'; task: Task; onSubmit: (updates: TaskUpdateDto) => void }
    )
