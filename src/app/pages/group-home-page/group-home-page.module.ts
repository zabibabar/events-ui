import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { GroupHomePageRoutingModule } from './group-home-page-routing.module'
import { GroupHomePageComponent } from './group-home-page.component'
import { EventsModule } from 'src/app/features/events/events.module'

@NgModule({
  declarations: [GroupHomePageComponent],
  imports: [EventsModule, CommonModule, GroupHomePageRoutingModule]
})
export class GroupHomePageModule {}
