import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GroupDetailsPageComponent } from '../group-details-page/group-details-page.component'
import { GroupsPageComponent } from './groups-page.component'

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: GroupsPageComponent },
      { path: ':groupId', component: GroupDetailsPageComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsPageRoutingModule {}
