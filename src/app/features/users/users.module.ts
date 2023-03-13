import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { UserAuthEffects } from '../users/store/user.effects'
import { userFeatureSelector, userAuthReducer } from '../users/store/user.reducer'
import { JwtInterceptor } from './interceptors/jwt-interceptor'
import { AuthModule } from '@auth0/auth0-angular'
import { LoginButtonComponent } from './components/login-button/login-button.component'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  declarations: [LoginButtonComponent],
  exports: [LoginButtonComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    StoreModule.forFeature(userFeatureSelector, userAuthReducer),
    EffectsModule.forFeature([UserAuthEffects]),
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
