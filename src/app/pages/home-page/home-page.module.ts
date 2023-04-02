import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { GroupsPageRoutingModule } from './home-page-routing.module'
import { HomePageComponent } from './home-page.component'
import { MatButtonModule } from '@angular/material/button'
import { CoreModule } from 'src/app/core/core.module'
import { GroupsModule } from 'src/app/features/groups/groups.module'

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, GroupsPageRoutingModule, MatButtonModule, GroupsModule, CoreModule]
})
export class HomePageModule {}
