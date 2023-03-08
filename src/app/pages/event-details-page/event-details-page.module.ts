import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { EventDetailsPageRoutingModule } from './event-details-page-routing.module'
import { EventDetailsPageComponent } from './event-details-page.component'
import { EventsModule } from 'src/app/features/events/events.module'

@NgModule({
  declarations: [EventDetailsPageComponent],
  imports: [EventsModule, CommonModule, EventDetailsPageRoutingModule]
})
export class EventsPageModule {}
