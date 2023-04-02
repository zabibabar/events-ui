import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { GroupsPageRoutingModule } from './home-page-routing.module'
import { HomePageComponent } from './home-page.component'
import { MatButtonModule } from '@angular/material/button'
import { CoreModule } from 'src/app/core/core.module'
import { GroupsModule } from 'src/app/features/groups/groups.module'
import { EventsModule } from 'src/app/features/events/events.module'
import { SectionModule } from 'src/app/shared/section/section.module'

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    GroupsPageRoutingModule,
    MatButtonModule,
    GroupsModule,
    CoreModule,
    EventsModule,
    SectionModule
  ]
})
export class HomePageModule {}
