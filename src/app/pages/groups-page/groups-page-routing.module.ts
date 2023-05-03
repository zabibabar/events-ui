import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GroupsPageComponent } from './groups-page.component'
import { GroupsPageGuard } from './groups-page.guard'

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: GroupsPageComponent, canActivate: [GroupsPageGuard] },
      { path: 'join', component: GroupsPageComponent },
      {
        path: ':groupId',
        loadChildren: () =>
          import('../group-details-page/group-details-page.module').then((m) => m.GroupDetailsPageModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsPageRoutingModule {}
