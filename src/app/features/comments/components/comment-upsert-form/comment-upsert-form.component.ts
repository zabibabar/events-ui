import { Component, Inject } from '@angular/core'
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { PostUpsertDialogData } from 'src/app/features/posts/types/post-upsert-dialog-data'
import { selectIsLoadingPostAction } from 'src/app/features/posts/store/post.selectors'

type CommentUpsertFormType = FormGroup<{
  name: FormControl<string>
  description: FormControl<string>
}>

@Component({
  selector: 'app-comment-upsert-form',
  templateUrl: './comment-upsert-form.component.html',
  styleUrls: ['./comment-upsert-form.component.scss']
})
export class CommentUpsertFormComponent {
  commentUpsertForm: CommentUpsertFormType
  isSubmitting$ = this.store.select(selectIsLoadingPostAction)

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: PostUpsertDialogData
  ) {}
}