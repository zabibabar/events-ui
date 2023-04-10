import { Attendee } from './attendee'

export interface Event {
  id: string
  groupId: string
  name: string
  picture: string
  timeStart: string
  timeEnd: string
  address: string
  description?: string
  attendees: Attendee[]
  attendeesCount: number
  goingAttendeesCount: number
  notGoingAttendeesCount: number
}
