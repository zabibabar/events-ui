import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { UserAuthEffects } from '../users/store/user.effects'
import { userFeatureSelector, userAuthReducer } from '../users/store/user.reducer'
import { JwtInterceptor } from './interceptors/jwt-interceptor'
import { AuthModule } from '@auth0/auth0-angular'
import { MatButtonModule } from '@angular/material/button'
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon';
import { UserGroupListComponent } from './components/user-group-list/user-group-list.component'

@NgModule({
  declarations: [UserDropdownComponent, UserGroupListComponent],
  exports: [UserDropdownComponent, UserGroupListComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
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
