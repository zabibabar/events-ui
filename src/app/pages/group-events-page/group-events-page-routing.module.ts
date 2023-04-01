import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GroupEventsPageComponent } from './group-events-page.component'
import { GroupEventsPageGuard } from './group-events-page.guard'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        canActivateChild: [GroupEventsPageGuard],
        children: [
          { path: '', component: GroupEventsPageComponent },
          { path: 'past', component: GroupEventsPageComponent, data: { past: true } }
        ]
      },
      {
        path: ':eventId',
        loadChildren: () =>
          import('../event-details-page/event-details-page.module').then((m) => m.EventDetailsPageModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupEventsPageRoutingModule {}
