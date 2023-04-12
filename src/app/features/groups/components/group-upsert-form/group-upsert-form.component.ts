import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { GroupUpsertDialogData } from '../../interfaces/group-upsert-dialog-data'
import { CloseUpsertGroupFormDialog } from '../../store/group.actions'
import { selectIsLoadingGroupAction } from '../../store/group.selectors'

@Component({
  selector: 'app-group-upsert-form',
  templateUrl: './group-upsert-form.component.html',
  styleUrls: ['./group-upsert-form.component.scss']
})
export class GroupUpsertFormComponent implements OnInit {
  group = this.data.group
  title = this.data.title
  onSubmit = this.data.onSubmit
  submitText = this.data.submitText

  groupCreateForm: FormGroup<{
    name: FormControl<string>
    description: FormControl<string>
  }>

  isSubmitting$ = this.store.select(selectIsLoadingGroupAction)

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private data: GroupUpsertDialogData
  ) {}

  ngOnInit(): void {
    this.groupCreateForm = this.fb.nonNullable.group({
      name: ['', Validators.required],
      description: ['']
    })

    if (this.group) this.groupCreateForm?.patchValue(this.group)
  }

  submit(): void {
    const { name, description } = this.groupCreateForm.getRawValue()
    this.onSubmit({ name, description })
  }

  onCancel(): void {
    this.store.dispatch(CloseUpsertGroupFormDialog())
  }
}
