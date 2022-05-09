import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { UserEffects } from '../users/store/user.effects'
import { userFeatureSelector, userReducer } from '../users/store/user.reducer'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ [userFeatureSelector]: userReducer }),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class UsersModule {}
