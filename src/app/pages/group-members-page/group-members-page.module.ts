import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { GroupMembersPageRoutingModule } from './group-members-page-routing.module'
import { GroupMembersPageComponent } from './group-members-page.component'
import { EventsModule } from 'src/app/features/events/events.module'
import { GroupsModule } from 'src/app/features/groups/groups.module'

@NgModule({
  declarations: [GroupMembersPageComponent],
  imports: [EventsModule, CommonModule, GroupMembersPageRoutingModule, GroupsModule]
})
export class GroupMembersPageModule {}
