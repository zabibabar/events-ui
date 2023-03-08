import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { GroupDetailsPageRoutingModule } from './group-details-page-routing.module'
import { GroupDetailsPageComponent } from './group-details-page.component'
import { EventsModule } from 'src/app/features/events/events.module'

@NgModule({
  declarations: [GroupDetailsPageComponent],
  imports: [EventsModule, CommonModule, GroupDetailsPageRoutingModule]
})
export class EventsPageModule {}
