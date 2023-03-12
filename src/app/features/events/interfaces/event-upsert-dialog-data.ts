import { EventCreateDto } from '../dtos/event-create-dto'
import { EventUpdateDto } from '../dtos/event-update-dto'
import { Event } from './event'

export interface EventUpsertDialogData {
  title: string
  event?: Event
  onSubmit: (group: EventCreateDto | EventUpdateDto) => void
  submitText: string
}
