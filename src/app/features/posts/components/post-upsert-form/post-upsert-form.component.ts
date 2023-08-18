import { Component, Inject, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { PostUpsertDialogData } from 'src/app/features/posts/types/post-upsert-dialog-data'
import { CloseUpsertPostFormDialog } from 'src/app/features/posts/store/post.actions'
import { selectIsLoadingPostAction } from 'src/app/features/posts/store/post.selectors'

type PostUpsertFormType = FormGroup<{
  body: FormControl<string>
}>

@Component({
  selector: 'app-post-upsert-form',
  templateUrl: './post-upsert-form.component.html',
  styleUrls: ['./post-upsert-form.component.scss']
})
export class PostUpsertFormComponent implements OnInit {
  postUpsertForm: PostUpsertFormType
  isSubmitting$ = this.store.select(selectIsLoadingPostAction)

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: PostUpsertDialogData
  ) {}

  ngOnInit(): void {
    this.postUpsertForm = this.fb.nonNullable.group({
      body: ['', [Validators.required, Validators.maxLength(35)]]
    })

    if (this.data.type === 'update') this.postUpsertForm.patchValue(this.data.post)
  }

  onCancel(): void {
    this.store.dispatch(CloseUpsertPostFormDialog())
  }

  submit(): void {
    const newPost = this.postUpsertForm.getRawValue()

    // if (this.data.type === 'create') this.data.onSubmit(newPost)
    // if (this.data.type === 'update') this.data.onSubmit(getDirtyFields(this.postUpsertForm))
  }
}
