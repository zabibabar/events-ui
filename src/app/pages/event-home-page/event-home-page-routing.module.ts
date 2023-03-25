import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { EventHomePageComponent } from './event-home-page.component'

const routes: Routes = [{ path: '', component: EventHomePageComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventHomePageRoutingModule {}
