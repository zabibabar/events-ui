import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { MatMenu } from '@angular/material/menu'
import { Store } from '@ngrx/store'
import { Task } from '../../interfaces/task.interface'
import { AssignTaskActions, UnassignTaskActions, UpdateTaskActions, RemoveTaskActions } from '../../store/task.actions'
import { Observable } from 'rxjs'
import { selectIsCurrentUserAssigned } from '../../store/task.selectors'

@Component({
  selector: 'app-task-options-menu',
  templateUrl: './task-options-menu.component.html',
  styleUrls: ['./task-options-menu.component.scss'],
  exportAs: 'taskOptionsMenu'
})
export class TaskOptionsMenuComponent implements OnInit {
  @ViewChild(MatMenu, { static: true }) menu: MatMenu
  @Input() task: Task
  @Input() eventId: string
  isCurrentUserAssigned$: Observable<boolean>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isCurrentUserAssigned$ = this.store.select(selectIsCurrentUserAssigned({ taskId: this.task.id }))
  }

  assignTask(): void {
    const { taskListId, id: taskId } = this.task
    this.store.dispatch(AssignTaskActions.assignTask({ taskListId, taskId, eventId: this.eventId }))
  }

  unassignTask(): void {
    const { taskListId, id: taskId } = this.task
    this.store.dispatch(UnassignTaskActions.unassignTask({ taskListId, taskId, eventId: this.eventId }))
  }

  editTask(): void {
    const { taskListId, id: taskId } = this.task
    this.store.dispatch(UpdateTaskActions.openUpdateTaskDialog({ taskListId, taskId, eventId: this.eventId }))
  }

  deleteTask(): void {
    const { taskListId, id: taskId } = this.task
    this.store.dispatch(RemoveTaskActions.openRemoveTaskDialog({ taskListId, taskId, eventId: this.eventId }))
  }
}
