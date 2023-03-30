import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { GroupHomePageRoutingModule } from './group-home-page-routing.module'
import { GroupHomePageComponent } from './group-home-page.component'
import { GroupsModule } from 'src/app/features/groups/groups.module'

@NgModule({
  declarations: [GroupHomePageComponent],
  imports: [GroupsModule, CommonModule, GroupHomePageRoutingModule]
})
export class GroupHomePageModule {}
