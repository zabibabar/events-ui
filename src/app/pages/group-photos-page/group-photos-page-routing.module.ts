import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GroupPhotosPageComponent } from './group-photos-page.component'

const routes: Routes = [{ path: '', component: GroupPhotosPageComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupPhotosPageRoutingModule {}
