import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store'
import { EventCreatedto } from '../dtos/event-create-dto'
import { EventUpdatedto } from '../dtos/event-update-dto'
import { Event } from '../interfaces/event'

export const FetchAllEventsActions = createActionGroup({
  source: 'Events',
  events: {
    'Fetch All Events': emptyProps(),
    'Fetch All Events Loading': emptyProps(),
    'Fetch All Events Error': props<{ error: string }>(),
    'Fetch All Events Success': props<{ events: Event[] }>()
  }
})

export const CreateEventActions = createActionGroup({
  source: 'Events',
  events: {
    'Open Create Event Dialog': emptyProps(),
    'Create Event': props<{ event: EventCreatedto }>(),
    'Create Event Loading': emptyProps(),
    'Create Event Error': props<{ error: string }>(),
    'Create Event Success': props<{ event: Event }>()
  }
})

export const UpdateEventActions = createActionGroup({
  source: 'Events',
  events: {
    'Open Update Event Dialog': props<{ eventId: string }>(),
    'Update Event': props<{ eventId: string; event: EventUpdatedto }>(),
    'Update Event Loading': emptyProps(),
    'Update Event Error': props<{ error: string }>(),
    'Update Event Success': props<{ event: Event }>()
  }
})

export const DeleteEventActions = createActionGroup({
  source: 'Events',
  events: {
    'Delete Event': props<{ eventId: string }>(),
    'Delete Event Loading': emptyProps(),
    'Delete Event Error': props<{ error: string }>(),
    'Delete Event Success': props<{ eventId: string }>()
  }
})

export const closeUpsertFormDialog = createAction('[Events] Close Upsert Form Dialog')
