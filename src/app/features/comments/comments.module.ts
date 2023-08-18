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
import { MatDialogModule } from '@angular/material/dialog'
import { LoadingSpinnerModule } from 'src/app/shared/loading-spinner/loading-spinner.module'
import { UsersModule } from '../users/users.module'
import { MatDividerModule } from '@angular/material/divider'
import { CommentOptionsMenuComponent } from './components/comment-options-menu/comment-options-menu.component'
import { CommentUpsertFormComponent } from './components/comment-upsert-form/comment-upsert-form.component'
import { CommentComponent } from './components/comment/comment.component'
import { CommentApiEffects } from './store/comment-api.effects'
import { commentFeatureSelector, commentReducer } from './store/comment.reducer'

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
    MatDividerModule,
    UsersModule,
    StoreModule.forFeature(commentFeatureSelector, commentReducer),
    EffectsModule.forFeature([CommentApiEffects])
  ],
  declarations: [CommentOptionsMenuComponent, CommentComponent, CommentUpsertFormComponent],
  exports: [CommentComponent]
})
export class CommentsModule {}
