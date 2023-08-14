import { Component, Input, ViewChild } from '@angular/core'
import { MatMenu } from '@angular/material/menu'
import { Store } from '@ngrx/store'
import { TaskList } from '../../interfaces/task-list.interface'
import { DeleteTaskListActions, UpdateTaskListActions, AddTaskActions } from '../../store/task.actions'

@Component({
  selector: 'app-task-list-options-menu',
  templateUrl: './task-list-options-menu.component.html',
  styleUrls: ['./task-list-options-menu.component.scss'],
  exportAs: 'taskListOptionsMenu'
})
export class TaskListOptionsMenuComponent {
  @ViewChild(MatMenu, { static: true }) menu: MatMenu
  @Input() taskList: TaskList

  constructor(private store: Store) {}

  deleteTaskList(): void {
    const { id: taskListId } = this.taskList
    this.store.dispatch(DeleteTaskListActions.openDeleteTaskListDialog({ taskListId }))
  }

  editTaskList(): void {
    const { id: taskListId } = this.taskList
    this.store.dispatch(UpdateTaskListActions.openUpdateTaskListDialog({ taskListId }))
  }
}
