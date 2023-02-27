import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SidenavComponent } from './components/sidenav/sidenav.component'
import { LoginButtonComponent } from './components/login-button/login-button.component'
import { UsersModule } from '../features/users/users.module'
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { MatButtonModule } from '@angular/material/button'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    UsersModule.forRoot({
      domain: 'dev-r8n3bvy7.us.auth0.com',
      clientId: 'yS5sBO76hm6CsDgY9aQcXmxxQKs90Lba',
      audience: 'https://events-api.demo.com',
      scope: 'openid profile email'
    })
  ],
  declarations: [SidenavComponent, LoginButtonComponent, ToolbarComponent, ThemeToggleComponent],
  exports: [SidenavComponent, LoginButtonComponent]
})
export class CoreModule {}
