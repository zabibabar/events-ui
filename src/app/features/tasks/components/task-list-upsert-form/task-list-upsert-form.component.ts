import { Component, Inject, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { TaskListUpsertDialogData } from 'src/app/features/tasks/types/task-list-upsert-dialog-data'
import { CloseUpsertTaskListFormDialog } from 'src/app/features/tasks/store/task.actions'
import { selectIsLoadingTaskListAction } from 'src/app/features/tasks/store/task-list.selectors'
import { getDirtyFields } from 'src/app/shared/get-dirty-fields'

type TaskListUpsertFormType = FormGroup<{
  name: FormControl<string>
  description: FormControl<string>
}>

@Component({
  selector: 'app-task-list-upsert-form',
  templateUrl: './task-list-upsert-form.component.html',
  styleUrls: ['./task-list-upsert-form.component.scss']
})
export class TaskListUpsertFormComponent implements OnInit {
  taskListUpsertForm: TaskListUpsertFormType
  isSubmitting$ = this.store.select(selectIsLoadingTaskListAction)

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: TaskListUpsertDialogData
  ) {}

  ngOnInit(): void {
    this.taskListUpsertForm = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.maxLength(35)]],
      description: ['']
    })

    if (this.data.type === 'update') this.taskListUpsertForm.patchValue(this.data.taskList)
  }

  onCancel(): void {
    this.store.dispatch(CloseUpsertTaskListFormDialog())
  }

  submit(): void {
    const newTaskList = this.taskListUpsertForm.getRawValue()

    if (this.data.type === 'create') this.data.onSubmit(newTaskList)
    if (this.data.type === 'update') this.data.onSubmit(getDirtyFields(this.taskListUpsertForm))
  }
}
