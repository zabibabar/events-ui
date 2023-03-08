import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { EventDetailsPageComponent } from '../event-details-page/event-details-page.component'
import { EventsPageComponent } from './events-page.component'

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: EventsPageComponent },
      { path: ':eventId', component: EventDetailsPageComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsPageRoutingModule {}
