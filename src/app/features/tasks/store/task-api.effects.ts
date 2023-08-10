import { Injectable } from '@angular/core'
import { TaskApiService } from '../services/task-api.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { ToastService } from 'src/app/shared/toast'
import * as TaskActions from './task.actions'
import { exhaustMap, map, catchError, of, tap, mergeMap } from 'rxjs'

@Injectable()
export class TaskApiEffects {
  constructor(private actions$: Actions, private taskApiService: TaskApiService, private toast: ToastService) {}

  fetchAllTaskLists$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.FetchAllTaskListActions.fetchAllTaskList),
      exhaustMap(({ eventId }) => {
        return this.taskApiService.getAllTaskLists(eventId).pipe(
          map((taskLists) => TaskActions.FetchAllTaskListActions.fetchAllTaskListSuccess({ taskLists })),
          catchError((error) => of(TaskActions.FetchAllTaskListActions.fetchAllTaskListError({ error })))
        )
      })
    )
  })

  createTaskList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.CreateTaskListActions.createTaskList),
      exhaustMap(({ eventId, taskList }) =>
        this.taskApiService.createTaskList(eventId, taskList).pipe(
          map((taskList) => TaskActions.CreateTaskListActions.createTaskListSuccess({ taskList })),
          tap(() => this.toast.success('Task List Created Successfully!')),
          catchError((error) =>
            of(TaskActions.CreateTaskListActions.createTaskListError({ error })).pipe(
              tap(() => this.toast.error('Error Creating Task! Try Again Later'))
            )
          )
        )
      )
    )
  })

  updateTaskList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.UpdateTaskListActions.updateTaskList),
      mergeMap(({ eventId, taskListId, taskList }) =>
        this.taskApiService.updateTaskList(eventId, taskListId, taskList).pipe(
          map((taskList) => TaskActions.UpdateTaskListActions.updateTaskListSuccess({ taskList })),
          tap(() => this.toast.success('Task List Updated Successfully!')),
          catchError((error) => of(TaskActions.UpdateTaskListActions.updateTaskListError({ error })))
        )
      )
    )
  })

  deleteTaskList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.DeleteTaskListActions.deleteTaskList),
      mergeMap(({ eventId, taskListId }) =>
        this.taskApiService.deleteTaskList(eventId, taskListId).pipe(
          map(() => TaskActions.DeleteTaskListActions.deleteTaskListSuccess({ taskListId })),
          tap(() => this.toast.success('Task List Deleted Successfully!')),
          catchError((error) =>
            of(TaskActions.DeleteTaskListActions.deleteTaskListError({ error })).pipe(
              tap(() => this.toast.error('Error Deleting Task List! Try Again Later'))
            )
          )
        )
      )
    )
  })

  addTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.AddTaskActions.addTask),
      mergeMap(({ eventId, taskListId, task }) =>
        this.taskApiService.addTask(eventId, taskListId, task).pipe(
          map((tasks) => TaskActions.AddTaskActions.addTaskSuccess({ eventId, taskListId, tasks })),
          tap(() => this.toast.success('Task Added Successfully!')),
          catchError((error) => of(TaskActions.AddTaskActions.addTaskError({ error })))
        )
      )
    )
  })

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.UpdateTaskActions.updateTask),
      mergeMap(({ eventId, taskListId, taskId, task }) =>
        this.taskApiService.updateTask(eventId, taskListId, taskId, task).pipe(
          map((tasks) => TaskActions.UpdateTaskActions.updateTaskSuccess({ eventId, taskListId, tasks })),
          tap(() => this.toast.success('Task Member Updated Successfully!')),
          catchError((error) => of(TaskActions.UpdateTaskActions.updateTaskError({ error })))
        )
      )
    )
  })

  removeTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.RemoveTaskActions.removeTask),
      mergeMap(({ eventId, taskListId, taskId }) =>
        this.taskApiService.removeTask(eventId, taskListId, taskId).pipe(
          map(() => TaskActions.RemoveTaskActions.removeTaskSuccess({ eventId, taskListId, taskId })),
          tap(() => this.toast.success('Removed Task Successfully!')),
          catchError((error) => of(TaskActions.RemoveTaskActions.removeTaskError({ error })))
        )
      )
    )
  })

  assignTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.AssignTaskActions.assignTask),
      mergeMap(({ eventId, taskListId, taskId }) =>
        this.taskApiService.assignTask(eventId, taskListId, taskId).pipe(
          map((tasks) => TaskActions.AssignTaskActions.assignTaskSuccess({ eventId, taskListId, tasks })),
          tap(() => this.toast.success('Task Member Updated Successfully!')),
          catchError((error) => of(TaskActions.AssignTaskActions.assignTaskError({ error })))
        )
      )
    )
  })

  unassignTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.UnassignTaskActions.unassignTask),
      mergeMap(({ eventId, taskListId, taskId }) =>
        this.taskApiService.unassignTask(eventId, taskListId, taskId).pipe(
          map((tasks) => TaskActions.UnassignTaskActions.unassignTaskSuccess({ eventId, taskListId, tasks })),
          tap(() => this.toast.success('Task Member Updated Successfully!')),
          catchError((error) => of(TaskActions.UnassignTaskActions.unassignTaskError({ error })))
        )
      )
    )
  })
}
