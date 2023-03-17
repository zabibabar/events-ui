import { NgModule, isDevMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CoreModule } from './core/core.module'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { MatNativeDateModule } from '@angular/material/core'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { appReducer } from './core/store/app.reducer'
import { ToastModule } from './shared/toast'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    MatNativeDateModule,
    StoreModule.forRoot(appReducer, {}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreRouterConnectingModule.forRoot(),
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
