import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GroupHomePageComponent } from './group-home-page.component'
import { GroupHomePageGuard } from './group-home-page.guard'

const routes: Routes = [{ path: '', component: GroupHomePageComponent, canActivate: [GroupHomePageGuard] }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupHomePageRoutingModule {}
