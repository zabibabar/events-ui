import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { GroupUpsertDialogData } from '../../interfaces/group-upsert-dialog-data'
import { closeUpsertFormDialog } from '../../store/group.actions'

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
    name: FormControl<string | null>
  }>

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private data: GroupUpsertDialogData
  ) {}

  ngOnInit(): void {
    this.groupCreateForm = this.fb.group({
      name: ['', Validators.required]
    })

    if (this.group) this.groupCreateForm?.patchValue(this.group)
  }

  submit(): void {
    const { name } = this.groupCreateForm.value
    this.onSubmit({ name: name as string })
    this.onCancel()
  }

  onCancel(): void {
    this.store.dispatch(closeUpsertFormDialog())
  }
}
