import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { EventTasksPageComponent } from './event-tasks-page.component'

const routes: Routes = [{ path: '', component: EventTasksPageComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventTasksPageRoutingModule {}
