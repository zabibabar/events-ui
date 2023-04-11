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
import { UserThemeToggleComponent } from './components/user-theme-toggle/user-theme-toggle.component'
import { DialogModule } from 'src/app/shared/dialog/dialog.module'
import { DialogFormModule } from 'src/app/shared/dialog-form/dialog-form.module'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { UserUpdateFormComponent } from './components/user-update-form/user-update-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { UserAvatarGroupComponent } from './components/user-avatar-group/user-avatar-group.component'
import { LoadingSpinnerModule } from 'src/app/shared/loading-spinner/loading-spinner.module'

@NgModule({
  declarations: [UserAvatarGroupComponent, UserDropdownComponent, UserThemeToggleComponent, UserUpdateFormComponent],
  exports: [UserAvatarGroupComponent, UserDropdownComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    DialogFormModule,
    DialogModule,
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
    }),
    LoadingSpinnerModule
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
