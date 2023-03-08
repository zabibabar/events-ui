import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { GroupDetailsPageRoutingModule } from './group-details-page-routing.module'
import { GroupDetailsPageComponent } from './group-details-page.component'
import { GroupsModule } from 'src/app/features/groups/groups.module'

@NgModule({
  declarations: [GroupDetailsPageComponent],
  imports: [GroupsModule, CommonModule, GroupDetailsPageRoutingModule]
})
export class GroupDetailsPageModule {}
