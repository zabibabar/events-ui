import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { UserAuthEffects } from '../users/store/user.effects'
import { userFeatureSelector, userAuthReducer } from '../users/store/user.reducer'
import { UserAuthConfig } from './interfaces/user-auth-config'
import { JwtInterceptor } from './interceptors/jwt-interceptor'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(userFeatureSelector, userAuthReducer),
    EffectsModule.forFeature([UserAuthEffects])
  ]
})
export class UsersModule {
  public static forRoot(config: UserAuthConfig): ModuleWithProviders<UsersModule> {
    return {
      ngModule: UsersModule,
      providers: [
        {
          provide: UserAuthConfig,
          useValue: config
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true
        }
      ]
    }
  }
}
