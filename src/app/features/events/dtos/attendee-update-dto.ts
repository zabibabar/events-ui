import { Attendee } from '../interfaces/attendee'

export type AttendeeUpdateDto = Partial<Omit<Attendee, 'id'>>
