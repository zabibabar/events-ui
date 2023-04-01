import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { GroupHomePageRoutingModule } from './group-home-page-routing.module'
import { GroupHomePageComponent } from './group-home-page.component'
import { GroupsModule } from 'src/app/features/groups/groups.module'
import { GroupHomePageGuard } from './group-home-page.guard'
import { EventsModule } from 'src/app/features/events/events.module'
import { CardModule } from 'src/app/shared/card/card.module'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  declarations: [GroupHomePageComponent],
  imports: [GroupsModule, EventsModule, CardModule, MatButtonModule, CommonModule, GroupHomePageRoutingModule],
  providers: [GroupHomePageGuard]
})
export class GroupHomePageModule {}
