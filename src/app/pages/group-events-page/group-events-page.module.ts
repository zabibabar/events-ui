import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { GroupEventsPageRoutingModule } from './group-events-page-routing.module'
import { GroupEventsPageComponent } from './group-events-page.component'
import { EventsModule } from 'src/app/features/events/events.module'
import { GroupEventsPageGuard } from './group-events-page.guard'
import { CardModule } from 'src/app/shared/card/card.module'
import { MatListModule } from '@angular/material/list'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [GroupEventsPageComponent],
  imports: [EventsModule, CommonModule, CardModule, MatListModule, RouterModule, GroupEventsPageRoutingModule],
  providers: [GroupEventsPageGuard]
})
export class GroupEventsPageModule {}
