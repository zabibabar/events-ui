/* eslint @ngrx/no-dispatch-in-effects: 0 */
import { Injectable } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { map, tap, filter } from 'rxjs/operators'
import { DialogType } from 'src/app/shared/dialog/dialog-type.enum'
import { DialogService } from 'src/app/shared/dialog/dialog.service'
import {
  DeleteTaskListActions,
  CreateTaskListActions,
  UpdateTaskListActions,
  CloseUpsertTaskListFormDialog,
  RemoveTaskActions,
  AddTaskActions,
  UpdateTaskActions,
  CloseUpsertTaskFormDialog
} from './task.actions'
import { TaskListUpsertFormComponent } from '../components/task-list-upsert-form/task-list-upsert-form.component'
import { DialogConfirmationComponent } from 'src/app/shared/dialog-confirmation/dialog-confirmation'
import { TaskListUpsertDialogData } from '../types/task-list-upsert-dialog-data'
import { TaskListCreateDto } from '../dtos/task-list-create-dto'
import { TaskListUpdateDto } from '../dtos/task-list-update-dto'
import { TaskList } from '../interfaces/task-list.interface'
import { selectIsLoadingTaskAction, selectTaskById } from './task.selectors'
import { selectTaskListById } from './task-list.selectors'
import { Task } from '../interfaces/task.interface'
import { TaskCreateDto } from '../dtos/task-create-dto'
import { TaskUpsertFormComponent } from '../components/task-upsert-form/task-upsert-form.component'
import { TaskUpsertDialogData } from '../types/task-upsert-dialog-data'
import { TaskUpdateDto } from '../dtos/task-update-dto'

@Injectable()
export class TaskUiEffects {
  private taskListUpsertFormDialogRef: MatDialogRef<TaskListUpsertFormComponent>
  private taskUpsertFormDialogRef: MatDialogRef<TaskUpsertFormComponent>
  private confirmationDialogRef: MatDialogRef<DialogConfirmationComponent>

  constructor(private actions$: Actions, private store: Store, private dialog: DialogService) {}

  openTaskListCreateFormDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CreateTaskListActions.openCreateTaskListDialog),
        tap(
          ({ eventId }) =>
            (this.taskListUpsertFormDialogRef = this.dialog.openForm<
              TaskListUpsertFormComponent,
              TaskListUpsertDialogData
            >(TaskListUpsertFormComponent, {
              type: DialogType.FORM,
              data: {
                title: 'Create New Task List',
                submitText: 'Create',
                type: 'create',
                onSubmit: (taskList: TaskListCreateDto) =>
                  this.store.dispatch(CreateTaskListActions.createTaskList({ eventId, taskList }))
              }
            }))
        )
      )
    },
    { dispatch: false }
  )

  openTaskListUpdateFormDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UpdateTaskListActions.openUpdateTaskListDialog),
        concatLatestFrom(({ taskListId }) => this.store.select(selectTaskListById({ taskListId }))),
        filter(([, taskList]) => !!taskList),
        map(([, taskList]) => taskList as TaskList),
        tap(
          (taskList) =>
            (this.taskListUpsertFormDialogRef = this.dialog.openForm<
              TaskListUpsertFormComponent,
              TaskListUpsertDialogData
            >(TaskListUpsertFormComponent, {
              type: DialogType.FORM,
              data: {
                taskList,
                title: `Edit ${taskList.name}`,
                submitText: 'Save Changes',
                type: 'update',
                onSubmit: (updates: TaskListUpdateDto) =>
                  this.store.dispatch(
                    UpdateTaskListActions.updateTaskList({
                      eventId: taskList.eventId,
                      taskListId: taskList.id,
                      taskList: updates
                    })
                  )
              }
            }))
        )
      )
    },
    { dispatch: false }
  )

  closeTaskListUpsertFormDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          CloseUpsertTaskListFormDialog,
          UpdateTaskListActions.updateTaskListSuccess,
          CreateTaskListActions.createTaskListSuccess
        ),
        tap(() => this.taskListUpsertFormDialogRef.close())
      )
    },
    { dispatch: false }
  )

  openDeleteTaskListDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DeleteTaskListActions.openDeleteTaskListDialog),
        concatLatestFrom(({ taskListId }) => this.store.select(selectTaskListById({ taskListId }))),
        filter(([, taskList]) => !!taskList),
        map(([, taskList]) => taskList as TaskList),
        tap(({ id: taskListId, eventId }) => {
          this.confirmationDialogRef = this.dialog.openConfirmationDialog({
            type: 'error',
            title: 'You are about to delete a task list?',
            message: 'You will not be able to add new tasks to this task list',
            primaryCTA: 'Delete Task List',
            onSubmit: () => this.store.dispatch(DeleteTaskListActions.deleteTaskList({ eventId, taskListId })),
            isLoading$: this.store.select(selectIsLoadingTaskAction)
          })
        })
      )
    },
    { dispatch: false }
  )

  openTaskAddFormDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AddTaskActions.openAddTaskDialog),
        tap(
          ({ eventId, taskListId, taskListName }) =>
            (this.taskUpsertFormDialogRef = this.dialog.openForm<TaskUpsertFormComponent, TaskUpsertDialogData>(
              TaskUpsertFormComponent,
              {
                type: DialogType.FORM,
                data: {
                  title: `Add New Task to ${taskListName}`,
                  submitText: 'Add',
                  type: 'create',
                  onSubmit: (task: TaskCreateDto) =>
                    this.store.dispatch(AddTaskActions.addTask({ eventId, taskListId, task }))
                }
              }
            ))
        )
      )
    },
    { dispatch: false }
  )

  openTaskUpdateFormDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UpdateTaskActions.openUpdateTaskDialog),
        concatLatestFrom(({ taskId }) => this.store.select(selectTaskById({ taskId }))),
        filter(([_, task]) => !!task),
        map(([action, task]) => [action, task] as [typeof action, Task]),
        tap(
          ([{ eventId, taskListId }, task]) =>
            (this.taskUpsertFormDialogRef = this.dialog.openForm<TaskUpsertFormComponent, TaskUpsertDialogData>(
              TaskUpsertFormComponent,
              {
                type: DialogType.FORM,
                data: {
                  title: `Update ${task.name}`,
                  submitText: 'Save Changes',
                  type: 'update',
                  task,
                  onSubmit: (updates: TaskUpdateDto) =>
                    this.store.dispatch(
                      UpdateTaskActions.updateTask({ eventId, taskListId, taskId: task.id, task: updates })
                    )
                }
              }
            ))
        )
      )
    },
    { dispatch: false }
  )

  closeTaskUpsertFormDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CloseUpsertTaskFormDialog, AddTaskActions.addTaskSuccess, UpdateTaskActions.updateTaskSuccess),
        tap(() => this.taskUpsertFormDialogRef.close())
      )
    },
    { dispatch: false }
  )

  openDeleteTaskDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RemoveTaskActions.openRemoveTaskDialog),
        concatLatestFrom(({ taskId }) => this.store.select(selectTaskById({ taskId }))),
        filter(([, task]) => !!task),
        map(([{ eventId, taskListId }, task]) => ({ task: task as Task, taskListId, eventId })),
        tap(({ task, taskListId, eventId }) => {
          this.confirmationDialogRef = this.dialog.openConfirmationDialog({
            type: 'error',
            title: `You are about to delete ${task.name}?`,
            message: 'You will not be able to view events in this task anymore!',
            primaryCTA: 'Remove Task',
            onSubmit: () => this.store.dispatch(RemoveTaskActions.removeTask({ taskId: task.id, taskListId, eventId })),
            isLoading$: this.store.select(selectIsLoadingTaskAction)
          })
        })
      )
    },
    { dispatch: false }
  )

  closeConfirmationDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          DeleteTaskListActions.deleteTaskListError,
          DeleteTaskListActions.deleteTaskListSuccess,
          RemoveTaskActions.removeTaskError,
          RemoveTaskActions.removeTaskSuccess
        ),
        tap(() => this.confirmationDialogRef.close())
      )
    },
    { dispatch: false }
  )
}
