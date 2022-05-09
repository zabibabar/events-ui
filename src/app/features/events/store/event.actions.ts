import { createAction, props } from '@ngrx/store'
import { Attendee } from '../interfaces/attendee'
import { Event } from '../interfaces/event'

export const fetchAllEvents = createAction('[Events] Fetch All Events')
export const fetchAllEventsLoading = createAction('[Events] Fetch All Events Loading')
export const fetchAllEventsError = createAction('[Events] Fetch All Events Error', props<{ error: string }>())
export const fetchAllEventsSuccess = createAction(
  '[Events Page] Fetch All Events Success',
  props<{ events: Event[] }>()
)

export const fetchEvent = createAction('[Events] Fetch Event', props<{ eventId: string }>())
export const fetchEventLoading = createAction('[Events] Fetch Event Loading')
export const fetchEventError = createAction('[Events] Fetch Event Error', props<{ error: string }>())
export const fetchEventSuccess = createAction('[Event Page] Fetch Event Success', props<{ event: Event }>())

export const createEvent = createAction('[Events] Create Event', props<{ event: Event }>())
export const createEventLoading = createAction('[Events] Create Event Loading')
export const createEventError = createAction('[Events] Create Event Error', props<{ error: string }>())
export const createEventSuccess = createAction('[Event Page] Create Event Success', props<{ event: Event }>())

export const updateEvent = createAction('[Events] Update Event', props<{ eventId: string; event: Event }>())
export const updateEventLoading = createAction('[Events] Update Event Loading')
export const updateEventError = createAction('[Events] Update Event Error', props<{ error: string }>())
export const updateEventSuccess = createAction('[Event Page] Update Event Success', props<{ event: Event }>())

export const deleteEvent = createAction('[Events] Delete Event', props<{ eventId: string }>())
export const deleteEventLoading = createAction('[Events] Delete Event Loading')
export const deleteEventError = createAction('[Events] Delete Event Error', props<{ error: string }>())
export const deleteEventSuccess = createAction('[Event Page] Delete Event Success', props<{ eventId: string }>())

export const addAttendees = createAction('[Events] Add Attendee', props<{ eventId: string; attendeeIds: string[] }>())
export const addAttendeesLoading = createAction('[Events] Add Attendee Loading')
export const addAttendeesError = createAction('[Events] Add Attendee Error', props<{ error: string }>())
export const addAttendeesSuccess = createAction('[Event Page] Add Attendee Success', props<{ attendees: Attendee[] }>())

export const removeAttendees = createAction(
  '[Events] Remove Attendees',
  props<{ eventId: string; attendeeIds: string[] }>()
)
export const removeAttendeesLoading = createAction('[Events] Remove Attendee Loading')
export const removeAttendeesError = createAction('[Events] Remove Attendee Error', props<{ error: string }>())
export const removeAttendeesSuccess = createAction(
  '[Event Page] Remove Attendee Success',
  props<{ attendeeIds: string[] }>()
)
