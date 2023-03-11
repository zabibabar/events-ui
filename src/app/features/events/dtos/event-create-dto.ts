import { Event } from '../interfaces/event'

export type EventCreatedto = Omit<Omit<Event, 'id'>, 'members'>
