import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { filter, map, take } from 'rxjs'
import { Event } from 'src/app/features/events/interfaces/event'
import { selectCurrentEvent } from 'src/app/features/events/store/event.selectors'
import { selectTaskListsForCurrentEvent } from 'src/app/features/tasks/store/task-list.selectors'
import { CreateTaskListActions, FetchAllTaskListActions } from 'src/app/features/tasks/store/task.actions'

@Component({
  selector: 'app-event-tasks-page',
  templateUrl: './event-tasks-page.component.html',
  styleUrls: ['./event-tasks-page.component.scss']
})
export class EventTasksPageComponent {
  currentEvent$ = this.store.select(selectCurrentEvent)
  taskLists$ = this.store.select(selectTaskListsForCurrentEvent)

  constructor(private store: Store) {
    this.currentEvent$
      .pipe(
        take(1),
        filter((event) => !!event),
        map((event) => event as Event)
      )
      .subscribe((e) => {
        this.store.dispatch(FetchAllTaskListActions.fetchAllTaskList({ eventId: e.id }))
      })
  }

  addNewTaskList(eventId: string): void {
    this.store.dispatch(CreateTaskListActions.openCreateTaskListDialog({ eventId }))
  }
}
