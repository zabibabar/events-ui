import { NgModule } from '@angular/core'

import { EventListComponent } from './components/event-list/event-list.component'
import { EventComponent } from './components/event/event.component'
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { EventEffects } from './store/event.effects'
import { eventFeatureSelector, eventReducer } from './store/event.reducer'
import { CommonModule } from '@angular/common'
import { EventCreateButtonComponent } from './components/event-create-button/event-create-button.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { EventHeaderComponent } from './components/event-header/event-header.component'
import { EventUpsertFormComponent } from './components/event-upsert-form/event-upsert-form.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { EventOptionsMenuComponent } from './components/event-options-menu/event-options-menu.component'
import { MatMenuModule } from '@angular/material/menu'

@NgModule({
  declarations: [
    EventListComponent,
    EventComponent,
    EventCreateButtonComponent,
    EventHeaderComponent,
    EventOptionsMenuComponent,
    EventUpsertFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(eventFeatureSelector, eventReducer),
    EffectsModule.forFeature([EventEffects])
  ],
  providers: [],
  exports: [EventListComponent, EventHeaderComponent]
})
export class EventsModule {}
