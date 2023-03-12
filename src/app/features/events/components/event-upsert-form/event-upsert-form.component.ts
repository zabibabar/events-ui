import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Group } from 'src/app/features/groups/interfaces/group'
import { selectCurrentGroup } from 'src/app/features/groups/store/group.selectors'
import { EventCreateDto } from '../../dtos/event-create-dto'
import { EventUpsertDialogData } from '../../interfaces/event-upsert-dialog-data'
import { closeUpsertFormDialog } from '../../store/event.actions'

type EventUpsertFormType = FormGroup<{
  name: FormControl<string | null>
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

  currentGroup$: Observable<Group | undefined> = this.store.select(selectCurrentGroup)

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private data: EventUpsertDialogData
  ) {}

  ngOnInit(): void {
    this.eventUpsertForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      timeStart: [new Date(), Validators.required],
      timeEnd: [new Date(), Validators.required],
      address: ['', Validators.required]
    })

    if (this.event) this.eventUpsertForm?.patchValue(this.event)
  }

  submit(): void {
    this.currentGroup$.subscribe((group) => {
      console.log(group)
      if (!group) return

      const { name, timeStart, timeEnd, address, description } = this.eventUpsertForm.value
      const newEvent: EventCreateDto = {
        name: name as string,
        address: address as string,
        description: description as string | undefined,
        groupId: group.id,
        timeStart: this.setHourTo(timeStart as Date, 19),
        timeEnd: this.setHourTo(timeEnd as Date, 22)
      }

      this.onSubmit(newEvent)
      this.onCancel()
    })
  }

  setHourTo(date: Date, hour: number): Date {
    return new Date(date.setHours(hour))
  }

  onCancel(): void {
    this.store.dispatch(closeUpsertFormDialog())
  }
}
