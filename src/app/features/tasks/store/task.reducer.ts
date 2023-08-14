import { Action, ActionReducer, createReducer, on } from '@ngrx/store'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { Task } from '../interfaces/task.interface'
import * as TaskActions from './task.actions'
import { TaskApi } from '../interfaces/task-api.interface'
import { TaskListApi } from '../interfaces/task-list-api.interface'

export const taskFeatureSelector = 'tasks'

export interface TaskStoreState extends EntityState<Task> {
  loading: boolean
  error: string | null
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: (task: Task) => task.id
})

const initialState: TaskStoreState = adapter.getInitialState({
  loading: false,
  error: null
})

export const taskReducer: ActionReducer<TaskStoreState, Action> = createReducer(
  initialState,
  on(
    TaskActions.FetchAllTaskListActions.fetchAllTaskList,
    TaskActions.CreateTaskListActions.createTaskList,
    TaskActions.UpdateTaskListActions.updateTaskList,
    TaskActions.DeleteTaskListActions.deleteTaskList,
    TaskActions.UpdateTaskActions.updateTask,
    TaskActions.AddTaskActions.addTask,
    TaskActions.UpdateTaskActions.updateTask,
    TaskActions.RemoveTaskActions.removeTask,
    TaskActions.AssignTaskActions.assignTask,
    TaskActions.UnassignTaskActions.unassignTask,
    (state): TaskStoreState => ({ ...state, loading: true })
  ),
  on(
    TaskActions.FetchAllTaskListActions.fetchAllTaskListError,
    TaskActions.CreateTaskListActions.createTaskListError,
    TaskActions.UpdateTaskListActions.updateTaskListError,
    TaskActions.DeleteTaskListActions.deleteTaskListError,
    TaskActions.UpdateTaskActions.updateTaskError,
    TaskActions.AddTaskActions.addTaskError,
    TaskActions.UpdateTaskActions.updateTaskError,
    TaskActions.RemoveTaskActions.removeTaskError,
    TaskActions.AssignTaskActions.assignTaskError,
    TaskActions.UnassignTaskActions.unassignTaskError,
    (state, { error }): TaskStoreState => ({ ...state, error, loading: false })
  ),
  on(
    TaskActions.FetchAllTaskListActions.fetchAllTaskListSuccess,
    (state, { taskLists }): TaskStoreState =>
      adapter.upsertMany(getTasksFromTaskList(taskLists), {
        ...state,
        error: null,
        loading: false
      })
  ),
  on(
    TaskActions.CreateTaskListActions.createTaskListSuccess,
    TaskActions.UpdateTaskListActions.updateTaskListSuccess,
    (state, { taskList }): TaskStoreState =>
      adapter.upsertMany(getTasksFromTaskList([taskList]), { ...state, error: null, loading: false })
  ),
  on(
    TaskActions.DeleteTaskListActions.deleteTaskListSuccess,
    (state, { taskListId }): TaskStoreState =>
      adapter.removeMany((t) => t.taskListId === taskListId, { ...state, error: null, loading: false })
  ),
  on(
    TaskActions.AddTaskActions.addTaskSuccess,
    TaskActions.UpdateTaskActions.updateTaskSuccess,
    TaskActions.AssignTaskActions.assignTaskSuccess,
    TaskActions.UnassignTaskActions.unassignTaskSuccess,
    (state, { taskListId, tasks }): TaskStoreState =>
      adapter.upsertMany(convertTaskApiArrayToTaskArray(tasks, taskListId), { ...state, error: null, loading: false })
  ),
  on(
    TaskActions.RemoveTaskActions.removeTaskSuccess,
    (state, { taskId }): TaskStoreState => adapter.removeOne(taskId, { ...state, error: null, loading: false })
  )
)

const getTasksFromTaskList = (taskLists: TaskListApi[]): Task[] =>
  taskLists.reduce<Task[]>((t, { id, tasks }) => [...t, ...convertTaskApiArrayToTaskArray(tasks, id)], [])

const convertTaskApiArrayToTaskArray = (tasks: TaskApi[], taskListId: string): Task[] =>
  tasks.map((t) => ({
    ...t,
    taskListId
  }))
