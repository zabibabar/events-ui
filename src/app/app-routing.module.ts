import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [{ path: 'events-page', loadChildren: () => import('./pages/events-page/events-page/events-page/events-page.module').then(m => m.EventsPageModule) }, { path: 'events-page', loadChildren: () => import('./pages/events-page/events-page/events-page/events-page.module').then(m => m.EventsPageModule) }, { path: 'events-page', loadChildren: () => import('./pages/events-page/events-page.module').then(m => m.EventsPageModule) }, { path: 'groups-page', loadChildren: () => import('./pages/groups-page/groups-page.module').then(m => m.GroupsPageModule) }, { path: 'groups-page', loadChildren: () => import('./pages/groups-page/groups-page.module').then(m => m.GroupsPageModule) }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
