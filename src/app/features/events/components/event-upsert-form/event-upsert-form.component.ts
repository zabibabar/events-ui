import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { EventUpsertDialogData } from '../../interfaces/event-upsert-dialog-data'
import { closeUpsertFormDialog } from '../../store/event.actions'

type EventUpsertFormType = FormGroup<{
  name: FormControl<string | null>
  group: FormControl<string | null>
  description: FormControl<string | null>
  timeStart: FormControl<Date | null>
  timeEnd: FormControl<Date | null>
  address: FormControl<string | null>
}>

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

  eventUpsertForm: EventUpsertFormType

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private data: EventUpsertDialogData
  ) {}

  ngOnInit(): void {
    this.eventUpsertForm = this.fb.group({
      name: ['', Validators.required],
      group: ['', Validators.required],
      description: [''],
      timeStart: [new Date(), Validators.required],
      timeEnd: [new Date(), Validators.required],
      address: ['', Validators.required]
    })

    if (this.event) this.eventUpsertForm?.patchValue(this.event)
  }

  submit(): void {
    const { name } = this.eventUpsertForm.value
    this.onSubmit({ name: name as string })
    this.onCancel()
  }

  onCancel(): void {
    this.store.dispatch(closeUpsertFormDialog())
  }
}
