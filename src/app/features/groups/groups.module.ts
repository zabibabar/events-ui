import { NgModule } from '@angular/core'

import { GroupListComponent } from './components/group-list/group-list.component'
import { GroupComponent } from './components/group/group.component'
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { GroupApiEffects } from './store/group-api.effects'
import { groupFeatureSelector, groupReducer } from './store/group.reducer'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { GroupHeaderComponent } from './components/group-header/group-header.component'
import { GroupUpsertFormComponent } from './components/group-upsert-form/group-upsert-form.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { GroupOptionsMenuComponent } from './components/group-options-menu/group-options-menu.component'
import { MatMenuModule } from '@angular/material/menu'
import { DialogFormModule } from 'src/app/shared/dialog-form/dialog-form.module'
import { DialogModule } from 'src/app/shared/dialog/dialog.module'
import { RouterModule } from '@angular/router'
import { MatTabsModule } from '@angular/material/tabs'
import { MatDividerModule } from '@angular/material/divider'
import { MatChipsModule } from '@angular/material/chips'
import { CoreModule } from 'src/app/core/core.module'
import { EventsModule } from '../events/events.module'
import { GroupMemberListComponent } from './components/group-member-list/group-member-list.component'
import { GroupMemberComponent } from './components/group-member/group-member.component'
import { UsersModule } from '../users/users.module'
import { CardModule } from 'src/app/shared/card/card.module'
import { GroupDescriptionComponent } from './components/group-description/group-description.component'
import { GroupMemberGridComponent } from './components/group-member-grid/group-member-grid.component'
import { SectionModule } from 'src/app/shared/section/section.module'
import { GroupOrganizerOptionsMenuComponent } from './components/group-organizer-options-menu/group-organizer-options-menu.component'
import { LoadingSpinnerModule } from 'src/app/shared/loading-spinner/loading-spinner.module'
import { GroupUiEffects } from './store/group-ui.effects'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatChipsModule,
    MatMenuModule,
    MatTabsModule,
    MatDividerModule,
    FormsModule,
    DialogFormModule,
    DialogModule,
    ReactiveFormsModule,
    EventsModule,
    UsersModule,
    CardModule,
    SectionModule,
    LoadingSpinnerModule,
    StoreModule.forFeature(groupFeatureSelector, groupReducer),
    EffectsModule.forFeature([GroupApiEffects, GroupUiEffects])
  ],
  providers: [],
  declarations: [
    GroupListComponent,
    GroupComponent,
    GroupHeaderComponent,
    GroupOptionsMenuComponent,
    GroupUpsertFormComponent,
    GroupMemberListComponent,
    GroupMemberComponent,
    GroupDescriptionComponent,
    GroupMemberGridComponent,
    GroupOrganizerOptionsMenuComponent
  ],
  exports: [
    GroupListComponent,
    GroupHeaderComponent,
    GroupMemberListComponent,
    GroupDescriptionComponent,
    GroupMemberGridComponent
  ]
})
export class GroupsModule {}
