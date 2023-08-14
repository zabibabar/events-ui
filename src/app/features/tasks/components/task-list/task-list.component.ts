import { Component, Input, OnInit } from '@angular/core'
import { TaskList } from '../../interfaces/task-list.interface'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Task } from '../../interfaces/task.interface'
import { selectTasksByTaskListId } from '../../store/task.selectors'
import { AddTaskActions } from '../../store/task.actions'

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

  addNewTask(): void {
    const { eventId, id: taskListId, name: taskListName } = this.taskList
    this.store.dispatch(AddTaskActions.openAddTaskDialog({ eventId, taskListId, taskListName }))
  }
}
