import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { JwtInterceptor } from './interceptors/jwt-interceptor'
import { AuthModule } from '@auth0/auth0-angular'
import { MatButtonModule } from '@angular/material/button'
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { UserAuthEffects } from './store/user-auth/user-auth.effects'
import { userAuthFeatureSelector, userAuthReducer } from './store/user-auth/user-auth.reducer'
import { UserEffects } from './store/user/user.effects'
import { userFeatureSelector, userReducer } from './store/user/user.reducer'

@NgModule({
  declarations: [UserDropdownComponent],
  exports: [UserDropdownComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    StoreModule.forFeature(userAuthFeatureSelector, userAuthReducer),
    StoreModule.forFeature(userFeatureSelector, userReducer),
    EffectsModule.forFeature([UserAuthEffects, UserEffects]),
    AuthModule.forRoot({
      domain: 'dev-r8n3bvy7.us.auth0.com',
      clientId: 'yS5sBO76hm6CsDgY9aQcXmxxQKs90Lba',
      authorizationParams: {
        audience: 'https://events-api.demo.com',
        redirect_uri: location.origin,
        scope: 'openid profile email'
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
})
export class UsersModule {}
