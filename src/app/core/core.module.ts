import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MaterialModule } from '../shared/material/material.module'
import { SidenavComponent } from './components/sidenav/sidenav.component'
import { LoginButtonComponent } from './components/login-button/login-button.component'
import { UsersModule } from '../features/users/users.module'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    UsersModule.forRoot({
      domain: 'dev-r8n3bvy7.us.auth0.com',
      clientId: 'yS5sBO76hm6CsDgY9aQcXmxxQKs90Lba',
      scope: 'openid profile email'
    })
  ],
  declarations: [SidenavComponent, LoginButtonComponent],
  exports: [SidenavComponent, LoginButtonComponent]
})
export class CoreModule {}
