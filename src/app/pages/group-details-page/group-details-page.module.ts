import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { GroupDetailsPageRoutingModule } from './group-details-page-routing.module'
import { GroupDetailsPageComponent } from './group-details-page.component'
import { GroupsModule } from 'src/app/features/groups/groups.module'
import { GroupDetailsPageGuard } from './group-details-page.guard'

@NgModule({
  declarations: [GroupDetailsPageComponent],
  imports: [GroupsModule, CommonModule, GroupDetailsPageRoutingModule],
  providers: [GroupDetailsPageGuard]
})
export class GroupDetailsPageModule {}
