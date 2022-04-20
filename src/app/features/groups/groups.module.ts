import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { GroupListComponent } from './components/group-list/group-list.component'
import { GroupComponent } from './components/group/group.component'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [GroupListComponent, GroupComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: []
})
export class GroupsModule {}
