import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { EventListComponent } from './components/event-list/event-list.component'
import { EventComponent } from './components/event/event.component'
import { EventEffects } from './store/event.effects'
import { eventFeatureSelector, eventReducer } from './store/event.reducer'

@NgModule({
  declarations: [EventListComponent, EventComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(eventFeatureSelector, eventReducer),
    EffectsModule.forFeature([EventEffects])
  ],
  providers: []
})
export class EventsModule {}
