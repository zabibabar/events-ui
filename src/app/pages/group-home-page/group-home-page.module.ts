import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { GroupHomePageRoutingModule } from './group-home-page-routing.module'
import { GroupHomePageComponent } from './group-home-page.component'
import { GroupsModule } from 'src/app/features/groups/groups.module'
import { GroupHomePageGuard } from './group-home-page.guard'
import { EventsModule } from 'src/app/features/events/events.module'
import { MatButtonModule } from '@angular/material/button'
import { SectionModule } from 'src/app/shared/section/section.module'

@NgModule({
  declarations: [GroupHomePageComponent],
  imports: [GroupsModule, EventsModule, MatButtonModule, CommonModule, SectionModule, GroupHomePageRoutingModule],
  providers: [GroupHomePageGuard]
})
export class GroupHomePageModule {}
