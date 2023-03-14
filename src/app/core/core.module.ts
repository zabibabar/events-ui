import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SidenavComponent } from './components/sidenav/sidenav.component'
import { UsersModule } from '../features/users/users.module'
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { MatButtonModule } from '@angular/material/button'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { PageContainerComponent } from './components/page-container/page-container.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    UsersModule
  ],
  declarations: [SidenavComponent, ToolbarComponent, PageContainerComponent],
  exports: [SidenavComponent, PageContainerComponent, ToolbarComponent]
})
export class CoreModule {}
