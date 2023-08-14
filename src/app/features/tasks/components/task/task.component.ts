import { Component, Input, OnInit } from '@angular/core'
import { Task } from '../../interfaces/task.interface'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { AssignTaskActions, RemoveTaskActions, UnassignTaskActions, UpdateTaskActions } from '../../store/task.actions'
import { selectIsCurrentUserAssigned, selectTaskAssignments } from '../../store/task.selectors'
import { TaskAssignment } from '../../interfaces/task-assignment.interface'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: Task
  @Input() eventId: string

  assignedUsers$: Observable<TaskAssignment[]>
  isCurrentUserAssigned$: Observable<boolean>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.assignedUsers$ = this.store.select(selectTaskAssignments({ taskId: this.task.id }))
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
