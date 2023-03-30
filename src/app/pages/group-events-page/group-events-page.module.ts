import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { GroupEventsPageRoutingModule } from './group-events-page-routing.module'
import { GroupEventsPageComponent } from './group-events-page.component'
import { EventsModule } from 'src/app/features/events/events.module'
import { GroupEventsPageGuard } from './group-events-page.guard'

@NgModule({
  declarations: [GroupEventsPageComponent],
  imports: [EventsModule, CommonModule, GroupEventsPageRoutingModule],
  providers: [GroupEventsPageGuard]
})
export class GroupEventsPageModule {}
