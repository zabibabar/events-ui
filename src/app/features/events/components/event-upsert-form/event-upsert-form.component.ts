import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { EventUpsertDialogData } from '../../interfaces/event-upsert-dialog-data'
import { closeUpsertFormDialog } from '../../store/event.actions'

@Component({
  selector: 'app-event-upsert-form',
  templateUrl: './event-upsert-form.component.html',
  styleUrls: ['./event-upsert-form.component.scss']
})
export class EventUpsertFormComponent implements OnInit {
  event = this.data.event
  title = this.data.title
  onSubmit = this.data.onSubmit
  submitText = this.data.submitText

  eventCreateForm: FormGroup<{
    name: FormControl<string | null>
  }>

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private data: EventUpsertDialogData
  ) {}

  ngOnInit(): void {
    this.eventCreateForm = this.fb.group({
      name: ['', Validators.required]
    })

    if (this.event) this.eventCreateForm?.patchValue(this.event)
  }

  submit(): void {
    const { name } = this.eventCreateForm.value
    this.onSubmit({ name: name as string })
    this.onCancel()
  }

  onCancel(): void {
    this.store.dispatch(closeUpsertFormDialog())
  }
}
