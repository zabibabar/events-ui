import { Event } from '../interfaces/event'

export type EventCreateDTO = Omit<Omit<Event, 'id'>, 'members'>
