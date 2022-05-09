import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { GroupListComponent } from './components/group-list/group-list.component'
import { GroupComponent } from './components/group/group.component'
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { GroupEffects } from './store/group.effects'
import { groupFeatureSelector, groupReducer } from './store/group.reducer'

@NgModule({
  declarations: [GroupListComponent, GroupComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ [groupFeatureSelector]: groupReducer }),
    EffectsModule.forFeature([GroupEffects])
  ],
  providers: []
})
export class GroupsModule {}
