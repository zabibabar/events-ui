import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home-page/home-page.module').then((m) => m.HomePageModule)
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
    path: '**',
    redirectTo: ''
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
