import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { EventDetailsPageComponent } from './event-details-page.component'

const routes: Routes = [{ path: '', component: EventDetailsPageComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventDetailsPageRoutingModule {}
