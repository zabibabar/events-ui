import { Dictionary } from '@ngrx/entity'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { adapter, taskListFeatureSelector, TaskListStoreState } from './task-list.reducer'
import { TaskList } from '../interfaces/task-list.interface'
import { selectCurrentEvent } from '../../events/store/event.selectors'

const { selectEntities, selectAll } = adapter.getSelectors()

export const selectTaskListState = createFeatureSelector<TaskListStoreState>(taskListFeatureSelector)
export const selectTaskListEntities = createSelector(selectTaskListState, selectEntities)
export const selectAllTaskLists = createSelector(selectTaskListState, selectAll)
export const selectIsLoadingTaskListAction = createSelector(selectTaskListState, (state) => state.loading)

export const selectTaskListById = (props: { taskListId: string }) =>
  createSelector(selectTaskListEntities, (taskListEntities: Dictionary<TaskList>) => taskListEntities[props.taskListId])

export const selectTaskListsForCurrentEvent = createSelector(
  selectCurrentEvent,
  selectAllTaskLists,
  (event, taskLists: TaskList[]) => taskLists.filter(({ eventId }) => eventId === event?.id)
)
