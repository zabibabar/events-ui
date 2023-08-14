import { Dictionary } from '@ngrx/entity'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Task } from '../interfaces/task.interface'
import { adapter, taskFeatureSelector, TaskStoreState } from './task.reducer'
import { selectCurrentUserId } from '../../users/store/user/user.selectors'

const { selectEntities, selectAll } = adapter.getSelectors()

export const selectTaskState = createFeatureSelector<TaskStoreState>(taskFeatureSelector)
export const selectTaskEntities = createSelector(selectTaskState, selectEntities)
export const selectAllTasks = createSelector(selectTaskState, selectAll)
export const selectIsLoadingTaskAction = createSelector(selectTaskState, (state) => state.loading)

export const selectTaskById = (props: { taskId: string }) =>
  createSelector(selectTaskEntities, (taskEntities: Dictionary<Task>) => taskEntities[props.taskId])

export const selectTasksByTaskListId = (props: { taskListId: string }) =>
  createSelector(selectAllTasks, (tasks: Task[]) => tasks.filter(({ taskListId }) => taskListId === props.taskListId))

export const selectTaskAssignments = (props: { taskId: string }) =>
  createSelector(selectTaskById(props), (task: Task | undefined) => task?.assignedTo ?? [])

export const selectIsCurrentUserAssigned = (props: { taskId: string }) =>
  createSelector(
    selectTaskById(props),
    selectCurrentUserId,
    (task, userId) => task?.assignedTo.some((a) => a.userId === userId) ?? false
  )
