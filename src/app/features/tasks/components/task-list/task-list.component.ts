import { Component, Input, OnInit } from '@angular/core'
import { TaskList } from '../../interfaces/task-list.interface'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Task } from '../../interfaces/task.interface'
import { AddTaskActions, DeleteTaskListActions, UpdateTaskListActions } from '../../store/task.actions'
import { selectTasksByTaskListId } from '../../store/task.selectors'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() taskList: TaskList

  tasks$: Observable<Task[]>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.tasks$ = this.store.select(selectTasksByTaskListId({ taskListId: this.taskList.id }))
  }

  deleteTaskList(): void {
    const { id: taskListId } = this.taskList
    this.store.dispatch(DeleteTaskListActions.openDeleteTaskListDialog({ taskListId }))
  }

  editTaskList(): void {
    const { id: taskListId } = this.taskList
    this.store.dispatch(UpdateTaskListActions.openUpdateTaskListDialog({ taskListId }))
  }

  addNewTask(): void {
    const { eventId, id: taskListId, name: taskListName } = this.taskList
    this.store.dispatch(AddTaskActions.openAddTaskDialog({ eventId, taskListId, taskListName }))
  }
}
