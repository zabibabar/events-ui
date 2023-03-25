import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { EventPhotosPageComponent } from './event-photos-page.component'

const routes: Routes = [{ path: '', component: EventPhotosPageComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventPhotosPageRoutingModule {}
