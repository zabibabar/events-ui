import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { GroupMembersPageRoutingModule } from './group-members-page-routing.module'
import { GroupMembersPageComponent } from './group-members-page.component'
import { EventsModule } from 'src/app/features/events/events.module'

@NgModule({
  declarations: [GroupMembersPageComponent],
  imports: [EventsModule, CommonModule, GroupMembersPageRoutingModule]
})
export class GroupMembersPageModule {}
