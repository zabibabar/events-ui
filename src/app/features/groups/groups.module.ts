import { NgModule } from '@angular/core'

import { GroupListComponent } from './components/group-list/group-list.component'
import { GroupComponent } from './components/group/group.component'
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { GroupEffects } from './store/group.effects'
import { groupFeatureSelector, groupReducer } from './store/group.reducer'
import { CommonModule } from '@angular/common'
import { GroupCreateButtonComponent } from './components/group-create-button/group-create-button.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { GroupHeaderComponent } from './components/group-header/group-header.component'
import { GroupCreateFormComponent } from './components/group-create-form/group-create-form.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { GroupOptionsMenuComponent } from './components/group-options-menu/group-options-menu.component'
import { MatMenuModule } from '@angular/material/menu'

@NgModule({
  declarations: [
    GroupListComponent,
    GroupComponent,
    GroupCreateButtonComponent,
    GroupHeaderComponent,
    GroupCreateFormComponent,
    GroupOptionsMenuComponent
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
    StoreModule.forFeature(groupFeatureSelector, groupReducer),
    EffectsModule.forFeature([GroupEffects])
  ],
  providers: [],
  exports: [GroupListComponent, GroupHeaderComponent]
})
export class GroupsModule {}
