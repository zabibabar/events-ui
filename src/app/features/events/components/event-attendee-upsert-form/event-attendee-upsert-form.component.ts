import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { EventAttendeeUpsertDialogData } from '../../interfaces/event-attendee-upsert-dialog-data'
import { selectIsLoadingEventAction } from '../../store/event.selectors'
import { EventTimeValidator } from '../event-upsert-form/event-time.validator'
import { CloseUpsertAttendeeFormDialog } from '../../store/event.actions'

type EventAttendeeUpsertFormType = FormGroup<{
  isGoing: FormControl<boolean>
  guests: FormControl<number>
}>

@Component({
  selector: 'app-event-attendee-upsert-form',
  templateUrl: './event-attendee-upsert-form.component.html',
  styleUrls: ['./event-attendee-upsert-form.component.scss']
})
export class EventAttendeeUpsertFormComponent implements OnInit {
  eventAttendeeUpsertForm: EventAttendeeUpsertFormType
  isSubmitting$ = this.store.select(selectIsLoadingEventAction)

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: EventAttendeeUpsertDialogData
  ) {}

  ngOnInit(): void {
    this.eventAttendeeUpsertForm = this.fb.nonNullable.group(
      {
        isGoing: [true, [Validators.required]],
        guests: [0, [Validators.required, Validators.min(0), Validators.max(5)]]
      },
      { validators: EventTimeValidator() }
    )

    if (this.data.attendee) this.eventAttendeeUpsertForm.patchValue({ ...this.data.attendee })
  }

  submit(): void {
    const formValue = this.eventAttendeeUpsertForm.value
    this.data.onSubmit(formValue)
  }

  onCancel(): void {
    this.store.dispatch(CloseUpsertAttendeeFormDialog())
  }
}
