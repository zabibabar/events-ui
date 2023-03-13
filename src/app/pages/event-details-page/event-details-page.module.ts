import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { EventDetailsPageRoutingModule } from './event-details-page-routing.module'
import { EventDetailsPageComponent } from './event-details-page.component'
import { EventsModule } from 'src/app/features/events/events.module'
import { CoreModule } from 'src/app/core/core.module'
import { EventDetailsPageGuard } from './event-details-page.guard'

@NgModule({
  declarations: [EventDetailsPageComponent],
  imports: [EventsModule, CommonModule, EventDetailsPageRoutingModule, CoreModule],
  providers: [EventDetailsPageGuard]
})
export class EventDetailsPageModule {}
