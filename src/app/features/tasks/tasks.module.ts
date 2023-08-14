import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatMenuModule } from '@angular/material/menu'
import { DialogFormModule } from 'src/app/shared/dialog-form/dialog-form.module'
import { TaskListComponent } from './components/task-list/task-list.component'
import { TaskListUpsertFormComponent } from './components/task-list-upsert-form/task-list-upsert-form.component'
import { TaskUpsertFormComponent } from './components/task-upsert-form/task-upsert-form.component'
import { TaskComponent } from './components/task/task.component'
import { UsersModule } from '../users/users.module'
import { taskListFeatureSelector, taskListReducer } from './store/task-list.reducer'
import { taskFeatureSelector, taskReducer } from './store/task.reducer'
import { TaskUiEffects } from './store/task-ui.effects'
import { TaskApiEffects } from './store/task-api.effects'
import { LoadingSpinnerModule } from 'src/app/shared/loading-spinner/loading-spinner.module'
import { MatDialogModule } from '@angular/material/dialog'
import { TaskOptionsMenuComponent } from './components/task-options-menu/task-options-menu.component'
import { TaskListOptionsMenuComponent } from './components/task-list-options-menu/task-list-options-menu.component'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    DialogFormModule,
    LoadingSpinnerModule,
    MatDialogModule,
    MatMenuModule,
    UsersModule,
    StoreModule.forFeature(taskListFeatureSelector, taskListReducer),
    StoreModule.forFeature(taskFeatureSelector, taskReducer),
    EffectsModule.forFeature([TaskUiEffects, TaskApiEffects])
  ],
  declarations: [
    TaskListComponent,
    TaskListUpsertFormComponent,
    TaskUpsertFormComponent,
    TaskListUpsertFormComponent,
    TaskUpsertFormComponent,
    TaskComponent,
    TaskListOptionsMenuComponent,
    TaskOptionsMenuComponent
  ],
  exports: [TaskListComponent, TaskListUpsertFormComponent]
})
export class TasksModule {}
