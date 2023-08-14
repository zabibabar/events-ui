import { Component, Inject, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { TaskUpsertDialogData } from 'src/app/features/tasks/types/task-upsert-dialog-data'
import { CloseUpsertTaskFormDialog } from 'src/app/features/tasks/store/task.actions'
import { selectIsLoadingTaskAction } from 'src/app/features/tasks/store/task.selectors'
import { getDirtyFields } from 'src/app/shared/get-dirty-fields'

type TaskUpsertFormType = FormGroup<{
  name: FormControl<string>
  description: FormControl<string>
}>

@Component({
  selector: 'app-task-upsert-form',
  templateUrl: './task-upsert-form.component.html',
  styleUrls: ['./task-upsert-form.component.scss']
})
export class TaskUpsertFormComponent implements OnInit {
  taskUpsertForm: TaskUpsertFormType
  isSubmitting$ = this.store.select(selectIsLoadingTaskAction)

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: TaskUpsertDialogData
  ) {}

  ngOnInit(): void {
    this.taskUpsertForm = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.maxLength(35)]],
      description: ['']
    })

    if (this.data.type === 'update') this.taskUpsertForm.patchValue(this.data.task)
  }

  submit(): void {
    const newTask = this.taskUpsertForm.getRawValue()

    if (this.data.type === 'create') this.data.onSubmit(newTask)
    if (this.data.type === 'update') this.data.onSubmit(getDirtyFields(this.taskUpsertForm))
  }

  onCancel(): void {
    this.store.dispatch(CloseUpsertTaskFormDialog())
  }
}
