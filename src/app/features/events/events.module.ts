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
import { MatDatepickerModule } from '@angular/material/datepicker'
import { DialogFormModule } from 'src/app/shared/dialog-form/dialog-form.module'
import { DialogModule } from 'src/app/shared/dialog/dialog.module'
import { RouterModule } from '@angular/router'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatDividerModule } from '@angular/material/divider'
import { CoreModule } from 'src/app/core/core.module'
import { MatTabsModule } from '@angular/material/tabs'
import { EventTimeLocationComponent } from './components/event-time-location/event-time-location.component'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { EventGoingButtonComponent } from './components/event-going-button/event-going-button.component'
import { UsersModule } from '../users/users.module'
import { EventDescriptionComponent } from './components/event-description/event-description.component'
import { EventAttendeeGridComponent } from './components/event-attendee-grid/event-attendee-grid.component'
import { CardModule } from 'src/app/shared/card/card.module'
import { EventAttendeeListComponent } from './components/event-attendee-list/event-attendee-list.component'
import { EventAttendeeListItemComponent } from './components/event-attendee-list-item/event-attendee-list-item.component'
import { SectionModule } from 'src/app/shared/section/section.module'
import { EventGroupCardComponent } from './components/event-group-card/event-group-card.component'
import { EventOrganizerCardComponent } from './components/event-organizer-card/event-organizer-card.component'
import { MatChipsModule } from '@angular/material/chips'
import { LoadingSpinnerModule } from 'src/app/shared/loading-spinner/loading-spinner.module'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatChipsModule,
    FormsModule,
    DialogFormModule,
    DialogModule,
    UsersModule,
    ReactiveFormsModule,
    CardModule,
    SectionModule,
    LoadingSpinnerModule,
    StoreModule.forFeature(eventFeatureSelector, eventReducer),
    EffectsModule.forFeature([EventEffects])
  ],
  providers: [],
  declarations: [
    EventListComponent,
    EventComponent,
    EventCreateButtonComponent,
    EventHeaderComponent,
    EventOptionsMenuComponent,
    EventUpsertFormComponent,
    EventTimeLocationComponent,
    EventGoingButtonComponent,
    EventDescriptionComponent,
    EventAttendeeGridComponent,
    EventAttendeeListComponent,
    EventAttendeeListItemComponent,
    EventGroupCardComponent,
    EventOrganizerCardComponent
  ],
  exports: [
    EventListComponent,
    EventHeaderComponent,
    EventCreateButtonComponent,
    EventHeaderComponent,
    EventDescriptionComponent,
    EventAttendeeGridComponent,
    EventAttendeeListComponent
  ]
})
export class EventsModule {}
