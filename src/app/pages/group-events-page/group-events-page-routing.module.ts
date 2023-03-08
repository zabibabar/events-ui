import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GroupEventsPageComponent } from './group-events-page.component'

const routes: Routes = [{ path: '', component: GroupEventsPageComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupEventsPageRoutingModule {}
