import { EventCreatedto } from '../dtos/event-create-dto'
import { EventUpdatedto } from '../dtos/event-update-dto'
import { Event } from './event'

export interface EventUpsertDialogData {
  title: string
  event?: Event
  onSubmit: (group: EventCreatedto | EventUpdatedto) => void
  submitText: string
}
