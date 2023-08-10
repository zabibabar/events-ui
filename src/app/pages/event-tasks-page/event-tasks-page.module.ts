import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { EventTasksPageRoutingModule } from './event-tasks-page-routing.module'
import { EventTasksPageComponent } from './event-tasks-page.component'
import { TasksModule } from 'src/app/features/tasks/tasks.module'

@NgModule({
  declarations: [EventTasksPageComponent],
  imports: [TasksModule, CommonModule, EventTasksPageRoutingModule]
})
export class EventTasksPageModule {}
