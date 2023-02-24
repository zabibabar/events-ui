import { Attendee } from './attendee'

export interface Event {
  id: string
  event: string
  name: string
  timeStart: Date
  timeEnd: Date
  description?: string
  attendees: Attendee[]
  address: string
  isRemote?: boolean
  hasPot?: boolean
}
