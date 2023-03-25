import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { EventAttendeesPageRoutingModule } from './event-attendees-page-routing.module'
import { EventAttendeesPageComponent } from './event-attendees-page.component'
import { EventsModule } from 'src/app/features/events/events.module'

@NgModule({
  declarations: [EventAttendeesPageComponent],
  imports: [EventsModule, CommonModule, EventAttendeesPageRoutingModule]
})
export class EventAttendeesPageModule {}
