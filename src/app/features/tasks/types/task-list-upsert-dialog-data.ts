import { TaskListCreateDto } from '../dtos/task-list-create-dto'
import { TaskListUpdateDto } from '../dtos/task-list-update-dto'
import { TaskList } from '../interfaces/task-list.interface'

export type TaskListUpsertDialogData =
  | {
      title: string
      submitText: string
    } & (
      | { type: 'create'; onSubmit: (taskList: TaskListCreateDto) => void }
      | { type: 'update'; taskList: TaskList; onSubmit: (updates: TaskListUpdateDto) => void }
    )
