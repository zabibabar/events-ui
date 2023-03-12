import { Attendee } from './attendee'

export interface Event {
  id: string
  name: string
  groupId: string
  timeStart: Date
  timeEnd: Date
  address: string
  description?: string
  attendees: Attendee[]
}
