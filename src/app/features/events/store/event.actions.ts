import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store'
import { UploadImageData } from 'src/app/shared/upload-image/upload-image-data'
import { EventCreateDto } from '../dtos/event-create-dto'
import { AttendeeUpdateDto } from '../dtos/attendee-update-dto'
import { Event } from '../interfaces/event'
import { EventUpdateDto } from '../dtos/event-update-dto'
import { Attendee } from '../interfaces/attendee'
import { EventRequestFilterOptions } from '../interfaces/event-request-filter-options'

export const FetchAllEventsActions = createActionGroup({
  source: 'Events',
  events: {
    'Fetch All Events': props<{ filterOptions: EventRequestFilterOptions }>(),
    'Fetch All Events Error': props<{ error: string }>(),
    'Fetch All Events Success': props<{ events: Event[] }>()
  }
})

export const FetchEventsByCurrentGroupActions = createActionGroup({
  source: 'Events',
  events: {
    'Fetch Events By Current Group': props<{ filterOptions: EventRequestFilterOptions }>(),
    'Fetch Events By Current Group Error': props<{ error: string }>(),
    'Fetch Events By Current Group Success': props<{ events: Event[] }>()
  }
})

export const FetchOneEventActions = createActionGroup({
  source: 'Events',
  events: {
    'Fetch One Event': props<{ eventId: string }>(),
    'Fetch One Event Error': props<{ error: string }>(),
    'Fetch One Event Success': props<{ event: Event }>()
  }
})

export const CreateEventActions = createActionGroup({
  source: 'Events',
  events: {
    'Open Create Event Dialog': emptyProps(),
    'Create Event': props<{ event: EventCreateDto }>(),
    'Create Event Error': props<{ error: string }>(),
    'Create Event Success': props<{ event: Event }>()
  }
})

export const UpdateEventActions = createActionGroup({
  source: 'Events',
  events: {
    'Open Update Event Dialog': props<{ eventId: string }>(),
    'Update Event': props<{ eventId: string; event: EventUpdateDto }>(),
    'Update Event Error': props<{ error: string }>(),
    'Update Event Success': props<{ event: Event }>()
  }
})

export const DeleteEventActions = createActionGroup({
  source: 'Events',
  events: {
    'Open Delete Event Dialog': props<{ eventId: string }>(),
    'Delete Event': props<{ eventId: string }>(),
    'Delete Event Error': props<{ error: string }>(),
    'Delete Event Success': props<{ eventId: string }>()
  }
})

export const AddEventAttendeeActions = createActionGroup({
  source: 'Events',
  events: {
    'Add Event Attendee': props<{ eventId: string; userId: string }>(),
    'Add Event Attendee Error': props<{ error: string }>(),
    'Add Event Attendee Success': props<{ eventId: string; attendees: Attendee[] }>()
  }
})

export const UpdateEventAttendeeActions = createActionGroup({
  source: 'Events',
  events: {
    'Update Event Attendee': props<{ eventId: string; attendeeId: string; changes: AttendeeUpdateDto }>(),
    'Update Event Attendee Error': props<{ error: string }>(),
    'Update Event Attendee Success': props<{ eventId: string; attendees: Attendee[] }>()
  }
})

export const UploadEventPictureActions = createActionGroup({
  source: 'Events',
  events: {
    'Open Upload Event Picture Dialog': props<{ data: UploadImageData }>(),
    'Upload Event Picture': props<{ eventId: string; imageFile: File }>(),
    'Upload Event Picture Error': props<{ error: string }>(),
    'Upload Event Picture Success': props<{ eventId: string; imageUrl: string }>()
  }
})

export const CloseUpsertEventFormDialog = createAction('[Events] Close Upsert Event Form Dialog')
export const FetchCurrentEvent = createAction('[Events] Fetch Current Event')
