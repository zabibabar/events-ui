import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GroupDetailsPageComponent } from './group-details-page.component'

const routes: Routes = [
  {
    path: '',
    component: GroupDetailsPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../group-home-page/group-home-page.module').then((m) => m.GroupHomePageModule)
      },
      {
        path: 'events',
        loadChildren: () => import('../group-events-page/group-events-page.module').then((m) => m.GroupEventsPageModule)
      },
      {
        path: 'members',
        loadChildren: () =>
          import('../group-members-page/group-members-page.module').then((m) => m.GroupMembersPageModule)
      },
      {
        path: 'photos',
        loadChildren: () => import('../group-photos-page/group-photos-page.module').then((m) => m.GroupPhotosPageModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupDetailsPageRoutingModule {}
