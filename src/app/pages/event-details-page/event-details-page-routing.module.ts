import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { EventDetailsPageComponent } from './event-details-page.component'
import { EventDetailsPageGuard } from './event-details-page.guard'

const routes: Routes = [
  {
    path: '',
    component: EventDetailsPageComponent,
    canActivate: [EventDetailsPageGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../event-home-page/event-home-page.module').then((m) => m.EventHomePageModule)
      },
      {
        path: 'attendees',
        loadChildren: () =>
          import('../event-attendees-page/event-attendees-page.module').then((m) => m.EventAttendeesPageModule)
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventDetailsPageRoutingModule {}
