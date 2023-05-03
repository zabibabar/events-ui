import { Attendee } from '../interfaces/attendee'

export type AttendeeUpdateDto = Partial<Pick<Attendee, 'isGoing' | 'guests'>>
