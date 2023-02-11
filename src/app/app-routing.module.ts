import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomePageComponent } from './pages/home-page/home-page.component'

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'groups',
    loadChildren: () => import('./pages/groups-page/groups-page.module').then((m) => m.GroupsPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./pages/events-page/events-page.module').then((m) => m.EventsPageModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
