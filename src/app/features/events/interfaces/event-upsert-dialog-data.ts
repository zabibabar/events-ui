import { EventCreateDTO } from '../dtos/event-create-dto'
import { EventUpdateDTO } from '../dtos/event-update-dto'
import { Event } from './event'

export interface EventUpsertDialogData {
  title: string
  event?: Event
  onSubmit: (group: EventCreateDTO | EventUpdateDTO) => void
  submitText: string
}
