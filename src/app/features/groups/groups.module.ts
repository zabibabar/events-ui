import { NgModule } from '@angular/core'

import { GroupListComponent } from './components/group-list/group-list.component'
import { GroupComponent } from './components/group/group.component'
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { GroupEffects } from './store/group.effects'
import { groupFeatureSelector, groupReducer } from './store/group.reducer'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [GroupListComponent, GroupComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(groupFeatureSelector, groupReducer),
    EffectsModule.forFeature([GroupEffects])
  ],
  providers: [],
  exports: [GroupListComponent]
})
export class GroupsModule {}
