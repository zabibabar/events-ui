import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { EventHomePageRoutingModule } from './event-home-page-routing.module'
import { EventHomePageComponent } from './event-home-page.component'
import { EventsModule } from 'src/app/features/events/events.module'
import { PostsModule } from 'src/app/features/posts/posts.module'

@NgModule({
  declarations: [EventHomePageComponent],
  imports: [EventsModule, CommonModule, EventHomePageRoutingModule, PostsModule]
})
export class EventHomePageModule {}
