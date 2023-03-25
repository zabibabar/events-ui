import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { EventHomePageRoutingModule } from './event-home-page-routing.module'
import { EventHomePageComponent } from './event-home-page.component'
import { EventsModule } from 'src/app/features/events/events.module'

@NgModule({
  declarations: [EventHomePageComponent],
  imports: [EventsModule, CommonModule, EventHomePageRoutingModule]
})
export class EventHomePageModule {}
