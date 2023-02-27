import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { GroupsPageRoutingModule } from './home-page-routing.module'
import { HomePageComponent } from './home-page.component'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, GroupsPageRoutingModule, MatButtonModule]
})
export class HomePageModule {}
