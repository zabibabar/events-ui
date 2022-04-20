import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { EventsPageComponent } from './pages/events-page/events-page.component'
import { GroupsPageComponent } from './pages/groups-page/groups-page.component'
import { EventsModule } from './features/events/events.module'
import { GroupsModule } from './features/groups/groups.module'
import { UsersModule } from './features/users/users.module'

@NgModule({
  declarations: [AppComponent, EventsPageComponent, GroupsPageComponent],
  imports: [BrowserModule, AppRoutingModule, EventsModule, GroupsModule, UsersModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
