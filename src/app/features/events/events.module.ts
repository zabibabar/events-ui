import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { EventListComponent } from './components/event-list/event-list.component'
import { EventComponent } from './components/event/event.component'

@NgModule({
  declarations: [EventListComponent, EventComponent],
  imports: [BrowserModule],
  providers: []
})
export class EventsModule {}
