import { Action, ActionReducer, createReducer, on } from '@ngrx/store'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import * as TaskListActions from './task.actions'
import { TaskList } from '../interfaces/task-list.interface'
import { TaskListApi } from '../interfaces/task-list-api.interface'

export const taskListFeatureSelector = 'task-lists'

export interface TaskListStoreState extends EntityState<TaskList> {
  loading: boolean
  error: string | null
}

export const adapter: EntityAdapter<TaskList> = createEntityAdapter<TaskList>({
  selectId: (taskList: TaskList) => taskList.id
})

const initialState: TaskListStoreState = adapter.getInitialState({
  loading: false,
  error: null
})

export const taskListReducer: ActionReducer<TaskListStoreState, Action> = createReducer(
  initialState,
  on(
    TaskListActions.FetchAllTaskListActions.fetchAllTaskList,
    TaskListActions.CreateTaskListActions.createTaskList,
    TaskListActions.UpdateTaskListActions.updateTaskList,
    TaskListActions.DeleteTaskListActions.deleteTaskList,
    (state): TaskListStoreState => ({ ...state, loading: true })
  ),
  on(
    TaskListActions.FetchAllTaskListActions.fetchAllTaskListError,
    TaskListActions.CreateTaskListActions.createTaskListError,
    TaskListActions.UpdateTaskListActions.updateTaskListError,
    TaskListActions.DeleteTaskListActions.deleteTaskListError,
    (state, { error }): TaskListStoreState => ({ ...state, error, loading: false })
  ),
  on(
    TaskListActions.FetchAllTaskListActions.fetchAllTaskListSuccess,
    (state, { taskLists }): TaskListStoreState =>
      adapter.upsertMany(getTaskListsFromTaskListsApi(taskLists), {
        ...state,
        error: null,
        loading: false
      })
  ),
  on(
    TaskListActions.CreateTaskListActions.createTaskListSuccess,
    TaskListActions.UpdateTaskListActions.updateTaskListSuccess,
    (state, { taskList }): TaskListStoreState =>
      adapter.upsertOne(convertTaskListApiToTaskList(taskList), { ...state, error: null, loading: false })
  ),
  on(
    TaskListActions.DeleteTaskListActions.deleteTaskListSuccess,
    (state, { taskListId }): TaskListStoreState =>
      adapter.removeOne(taskListId, { ...state, error: null, loading: false })
  )
)

const getTaskListsFromTaskListsApi = (taskLists: TaskListApi[]): TaskList[] =>
  taskLists.map((t) => convertTaskListApiToTaskList(t))

const convertTaskListApiToTaskList = ({ tasks, ...taskList }: TaskListApi): TaskList => taskList
