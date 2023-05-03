import { AttendeeUpdateDto } from '../dtos/attendee-update-dto'
import { Attendee } from './attendee'

export interface EventAttendeeUpsertDialogData {
  title: string
  attendee: Attendee
  onSubmit: (changes: AttendeeUpdateDto) => void
  submitText: string
}
