import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MaterialModule } from '../shared/material/material.module'
import { SidenavComponent } from './components/sidenav/sidenav.component'

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule, MaterialModule],
  declarations: [SidenavComponent],
  exports: [SidenavComponent]
})
export class CoreModule {}
