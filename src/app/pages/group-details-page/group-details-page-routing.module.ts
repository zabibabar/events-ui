import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GroupDetailsPageComponent } from './group-details-page.component'

const routes: Routes = [{ path: '', component: GroupDetailsPageComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupDetailsPageRoutingModule {}
