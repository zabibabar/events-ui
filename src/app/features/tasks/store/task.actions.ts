import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store'
import { TaskList } from '../interfaces/task-list.interface'
import { TaskListCreateDto } from '../dtos/task-list-create-dto'
import { TaskListUpdateDto } from '../dtos/task-list-update-dto'
import { TaskCreateDto } from '../dtos/task-create-dto'
import { Task } from '../interfaces/task.interface'
import { TaskUpdateDto } from '../dtos/task-update-dto'

export const FetchAllTaskListActions = createActionGroup({
  source: 'TaskList',
  events: {
    'Fetch All Task List': props<{ eventId: string }>(),
    'Fetch All Task List Error': props<{ error: string }>(),
    'Fetch All Task List Success': props<{ taskLists: TaskList[] }>()
  }
})

export const CreateTaskListActions = createActionGroup({
  source: 'TaskList',
  events: {
    'Open Create Task List Dialog': emptyProps(),
    'Create Task List': props<{ eventId: string; taskList: TaskListCreateDto }>(),
    'Create Task List Error': props<{ error: string }>(),
    'Create Task List Success': props<{ taskList: TaskList }>()
  }
})

export const UpdateTaskListActions = createActionGroup({
  source: 'TaskList',
  events: {
    'Open Update Task List Dialog': props<{ taskListId: string }>(),
    'Update Task List': props<{ eventId: string; taskListId: string; taskList: TaskListUpdateDto }>(),
    'Update Task List Error': props<{ error: string }>(),
    'Update Task List Success': props<{ taskList: TaskList }>()
  }
})

export const DeleteTaskListActions = createActionGroup({
  source: 'TaskList',
  events: {
    'Open Delete Task List Dialog': props<{ taskListId: string }>(),
    'Delete Task List': props<{ eventId: string; taskListId: string }>(),
    'Delete Task List Error': props<{ error: string }>(),
    'Delete Task List Success': props<{ taskListId: string }>()
  }
})

export const AddTaskActions = createActionGroup({
  source: 'Task',
  events: {
    'Open Add Task Dialog': props<{ eventId: string; taskListId: string }>(),
    'Add Task': props<{ eventId: string; taskListId: string; task: TaskCreateDto }>(),
    'Add Task Error': props<{ error: string }>(),
    'Add Task Success': props<{ eventId: string; taskListId: string; tasks: Task[] }>()
  }
})

export const UpdateTaskActions = createActionGroup({
  source: 'Task',
  events: {
    'Open Update Task Dialog': props<{ eventId: string; taskListId: string; taskId: string }>(),
    'Update Task': props<{ eventId: string; taskListId: string; taskId: string; task: TaskUpdateDto }>(),
    'Update Task Error': props<{ error: string }>(),
    'Update Task Success': props<{ eventId: string; taskListId: string; tasks: Task[] }>()
  }
})

export const RemoveTaskActions = createActionGroup({
  source: 'Task',
  events: {
    'Open Remove Task Dialog': props<{ eventId: string; taskListId: string; taskId: string }>(),
    'Remove Task': props<{ eventId: string; taskListId: string; taskId: string }>(),
    'Remove Task Error': props<{ error: string }>(),
    'Remove Task Success': props<{ eventId: string; taskListId: string; taskId: string }>()
  }
})

export const AssignTaskActions = createActionGroup({
  source: 'Task',
  events: {
    'Assign Task': props<{ eventId: string; taskListId: string; taskId: string }>(),
    'Assign Task Error': props<{ error: string }>(),
    'Assign Task Success': props<{ eventId: string; taskListId: string; tasks: Task[] }>()
  }
})

export const UnassignTaskActions = createActionGroup({
  source: 'Task',
  events: {
    'Unassign Task': props<{ eventId: string; taskListId: string; taskId: string }>(),
    'Unassign Task Error': props<{ error: string }>(),
    'Unassign Task Success': props<{ eventId: string; taskListId: string; tasks: Task[] }>()
  }
})

export const CloseUpsertGroupFormDialog = createAction('[TaskList] Close Upsert Task List Form Dialog')
