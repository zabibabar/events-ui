import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { GroupPhotosPageRoutingModule } from './group-photos-page-routing.module'
import { GroupPhotosPageComponent } from './group-photos-page.component'
import { EventsModule } from 'src/app/features/events/events.module'

@NgModule({
  declarations: [GroupPhotosPageComponent],
  imports: [EventsModule, CommonModule, GroupPhotosPageRoutingModule]
})
export class GroupPhotosPageModule {}
