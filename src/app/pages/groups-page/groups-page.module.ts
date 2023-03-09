import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { GroupsPageRoutingModule } from './groups-page-routing.module'
import { GroupsPageComponent } from './groups-page.component'
import { GroupsModule } from 'src/app/features/groups/groups.module'
import { CoreModule } from 'src/app/core/core.module'

@NgModule({
  declarations: [GroupsPageComponent],
  imports: [CommonModule, GroupsModule, GroupsPageRoutingModule, CoreModule]
})
export class GroupsPageModule {}
