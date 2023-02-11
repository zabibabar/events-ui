import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { EventsPageRoutingModule } from './events-page-routing.module'
import { EventsPageComponent } from './events-page.component'
import { EventsModule } from 'src/app/features/events/events.module'

@NgModule({
  declarations: [EventsPageComponent],
  imports: [EventsModule, CommonModule, EventsPageRoutingModule]
})
export class EventsPageModule {}
