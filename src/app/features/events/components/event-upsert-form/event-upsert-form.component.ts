import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { take } from 'rxjs'
import { selectCurrentGroup } from 'src/app/features/groups/store/group.selectors'
import { EventCreateDto } from '../../dtos/event-create-dto'
import { EventUpsertDialogData } from '../../interfaces/event-upsert-dialog-data'
import { CloseUpsertEventFormDialog } from '../../store/event.actions'
import { selectIsLoadingEventAction } from '../../store/event.selectors'
import { formatDate } from '@angular/common'
import { EventTimeValidator } from './event-time.validator'
import { Event } from '../../interfaces/event'

type EventUpsertFormType = FormGroup<{
  name: FormControl<string>
  description: FormControl<string>
  timeStart: FormControl<string>
  timeEnd: FormControl<string>
  address: FormControl<string>
}>

@Component({
  selector: 'app-event-upsert-form',
  templateUrl: './event-upsert-form.component.html',
  styleUrls: ['./event-upsert-form.component.scss']
})
export class EventUpsertFormComponent implements OnInit {
  eventUpsertForm: EventUpsertFormType
  isSubmitting$ = this.store.select(selectIsLoadingEventAction)

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: EventUpsertDialogData
  ) {}

  ngOnInit(): void {
    this.eventUpsertForm = this.fb.nonNullable.group(
      {
        name: ['', [Validators.required, Validators.maxLength(35)]],
        description: [''],
        timeStart: [this.getDateWithTime(new Date(), '19:00'), Validators.required],
        timeEnd: [this.getDateWithTime(new Date(), '22:00'), Validators.required],
        address: ['', Validators.required]
      },
      { validators: EventTimeValidator() }
    )

    if (this.data.event) this.patchEvent(this.data.event)
  }

  patchEvent(event: Event): void {
    this.eventUpsertForm.patchValue({
      ...event,
      timeStart: this.getDateWithTime(event.timeStart),
      timeEnd: this.getDateWithTime(event.timeEnd)
    })
  }

  submit(): void {
    this.store
      .select(selectCurrentGroup)
      .pipe(take(1))
      .subscribe((group) => {
        if (!group) return

        const formValue = this.getDirtyFields(this.eventUpsertForm)
        const newEvent = {
          ...formValue,
          groupId: group.id,
          timeStart: new Date(this.eventUpsertForm.get('timeStart')?.value as string).toISOString(),
          timeEnd: new Date(this.eventUpsertForm.get('timeEnd')?.value as string).toISOString()
        }

        this.data.onSubmit(newEvent)
      })
  }

  onCancel(): void {
    this.store.dispatch(CloseUpsertEventFormDialog())
  }

  private getDateWithTime(date: string | Date, time = 'HH:mm'): string {
    return formatDate(new Date(date), `yyyy-LL-ddT${time}`, 'en-US')
  }

  private getDirtyFields(formGroup: FormGroup): Partial<EventCreateDto> {
    const dirtyValues: Record<string, string> = {}
    Object.keys(formGroup.controls).forEach((c) => {
      const currentControl = formGroup.get(c)

      if (currentControl?.dirty) {
        dirtyValues[c] = currentControl.value
      }
    })
    return dirtyValues
  }
}
