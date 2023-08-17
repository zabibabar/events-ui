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
import { PostOptionsMenuComponent } from './components/post-options-menu/post-options-menu.component'
import { PostUpsertFormComponent } from './components/post-upsert-form/post-upsert-form.component'
import { PostComponent } from './components/post/post.component'
import { PostApiEffects } from './store/post-api.effects'
import { postFeatureSelector, postReducer } from './store/post-comment.reducer'
import { PostUiEffects } from './store/post-ui.effects'
import { PostCommentOptionsMenuComponent } from './components/post-comment-options-menu/post-comment-options-menu.component'
import { PostCommentComponent } from './components/post-comment/post-comment.component'
import { PostCommentUpsertFormComponent } from './components/post-comment-upsert-form/post-comment-upsert-form.component'

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
    StoreModule.forFeature(postFeatureSelector, postReducer),
    StoreModule.forFeature(postFeatureSelector, postReducer),
    EffectsModule.forFeature([PostUiEffects, PostApiEffects])
  ],
  declarations: [
    PostComponent,
    PostUpsertFormComponent,
    PostOptionsMenuComponent,
    PostCommentOptionsMenuComponent,
    PostCommentComponent,
    PostCommentUpsertFormComponent
  ],
  exports: []
})
export class PostsModule {}
