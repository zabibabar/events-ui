import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { DialogModule } from '@angular/cdk/dialog'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatMenuModule } from '@angular/material/menu'
import { DialogFormModule } from 'src/app/shared/dialog-form/dialog-form.module';
import { TaskListComponent } from './components/task-list/task-list.component'

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
    DialogModule
    // StoreModule.forFeature(),
    // EffectsModule.forFeature()
  ],
  declarations: [
    TaskListComponent
  ]
})
export class TasksModule {}
