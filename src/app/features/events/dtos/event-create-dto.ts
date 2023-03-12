import { Event } from '../interfaces/event'

export type EventCreateDto = Omit<Omit<Event, 'id'>, 'attendees'>
