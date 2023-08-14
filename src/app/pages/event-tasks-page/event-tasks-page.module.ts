import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { EventTasksPageRoutingModule } from './event-tasks-page-routing.module'
import { EventTasksPageComponent } from './event-tasks-page.component'
import { TasksModule } from 'src/app/features/tasks/tasks.module'
import { CoreModule } from 'src/app/core/core.module'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [EventTasksPageComponent],
  imports: [CoreModule, TasksModule, CommonModule, EventTasksPageRoutingModule, MatButtonModule, MatIconModule]
})
export class EventTasksPageModule {}
