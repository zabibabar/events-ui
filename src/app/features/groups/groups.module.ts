import { NgModule } from '@angular/core'

import { GroupListComponent } from './components/group-list/group-list.component'
import { GroupComponent } from './components/group/group.component'
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { GroupEffects } from './store/group.effects'
import { groupFeatureSelector, groupReducer } from './store/group.reducer'
import { CommonModule } from '@angular/common'
import { GroupCreateButtonComponent } from './components/group-create-button/group-create-button.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { GroupHeaderComponent } from './components/group-header/group-header.component'

@NgModule({
  declarations: [GroupListComponent, GroupComponent, GroupCreateButtonComponent, GroupHeaderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    StoreModule.forFeature(groupFeatureSelector, groupReducer),
    EffectsModule.forFeature([GroupEffects])
  ],
  providers: [],
  exports: [GroupListComponent, GroupHeaderComponent]
})
export class GroupsModule {}
