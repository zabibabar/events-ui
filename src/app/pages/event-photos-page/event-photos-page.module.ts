import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { EventPhotosPageRoutingModule } from './event-photos-page-routing.module'
import { EventPhotosPageComponent } from './event-photos-page.component'
import { EventsModule } from 'src/app/features/events/events.module'

@NgModule({
  declarations: [EventPhotosPageComponent],
  imports: [EventsModule, CommonModule, EventPhotosPageRoutingModule]
})
export class EventPhotosPageModule {}
