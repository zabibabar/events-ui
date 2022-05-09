import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { EventListComponent } from './components/event-list/event-list.component'
import { EventComponent } from './components/event/event.component'
import { EventEffects } from './store/event.effects'
import { eventFeatureSelector, eventReducer } from './store/event.reducer'

@NgModule({
  declarations: [EventListComponent, EventComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ [eventFeatureSelector]: eventReducer }),
    EffectsModule.forFeature([EventEffects])
  ],
  providers: []
})
export class EventsModule {}
