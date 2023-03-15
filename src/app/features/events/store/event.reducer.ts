import { Action, ActionReducer, createReducer, on } from '@ngrx/store'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { Event } from '../interfaces/event'
import * as EventActions from './event.actions'

export const eventFeatureSelector = 'events'

export interface EventStoreState extends EntityState<Event> {
  selectedEventId: string | null
  loading: boolean
  error: string | null
}

export const adapter: EntityAdapter<Event> = createEntityAdapter<Event>({
  selectId: (event: Event) => event.id,
  sortComparer: (a: Event, b: Event) => new Date(b.timeStart).getTime() - new Date(a.timeStart).getTime()
})

const initialState: EventStoreState = adapter.getInitialState({
  selectedEventId: null,
  loading: false,
  error: null
})

export const eventReducer: ActionReducer<EventStoreState, Action> = createReducer(
  initialState,
  on(EventActions.FetchAllEventsActions.fetchAllEvents, (state): EventStoreState => ({ ...state, loading: true })),
  on(
    EventActions.FetchAllEventsActions.fetchAllEventsSuccess,
    (state, { events }): EventStoreState => adapter.upsertMany(events, { ...state, error: null, loading: false })
  ),
  on(
    EventActions.FetchAllEventsActions.fetchAllEventsError,
    (state, { error }): EventStoreState => ({ ...state, error, loading: false })
  ),
  on(
    EventActions.FetchEventsByCurrentGroupActions.fetchEventsByCurrentGroup,
    (state): EventStoreState => ({ ...state, loading: true })
  ),
  on(
    EventActions.FetchEventsByCurrentGroupActions.fetchEventsByCurrentGroupSuccess,
    (state, { events }): EventStoreState => adapter.upsertMany(events, { ...state, error: null, loading: false })
  ),
  on(
    EventActions.FetchEventsByCurrentGroupActions.fetchEventsByCurrentGroupError,
    (state, { error }): EventStoreState => ({ ...state, error, loading: false })
  ),

  on(EventActions.FetchOneEventActions.fetchOneEvent, (state): EventStoreState => ({ ...state, loading: true })),
  on(
    EventActions.FetchOneEventActions.fetchOneEventSuccess,
    (state, { event }): EventStoreState => adapter.upsertOne(event, { ...state, error: null, loading: false })
  ),
  on(
    EventActions.FetchAllEventsActions.fetchAllEventsError,
    (state, { error }): EventStoreState => ({ ...state, error, loading: false })
  ),
  on(EventActions.CreateEventActions.createEvent, (state): EventStoreState => ({ ...state, loading: true })),
  on(
    EventActions.CreateEventActions.createEventSuccess,
    (state, { event }): EventStoreState => adapter.upsertOne(event, { ...state, error: null, loading: false })
  ),
  on(
    EventActions.CreateEventActions.createEventError,
    (state, { error }): EventStoreState => ({ ...state, error, loading: false })
  ),
  on(EventActions.UpdateEventActions.updateEvent, (state): EventStoreState => ({ ...state, loading: true })),
  on(
    EventActions.UpdateEventActions.updateEventSuccess,
    (state, { event }): EventStoreState => adapter.upsertOne(event, { ...state, error: null, loading: false })
  ),
  on(
    EventActions.UpdateEventActions.updateEventError,
    (state, { error }): EventStoreState => ({ ...state, error, loading: false })
  ),
  on(EventActions.DeleteEventActions.deleteEvent, (state): EventStoreState => ({ ...state, loading: true })),
  on(
    EventActions.DeleteEventActions.deleteEventSuccess,
    (state, { eventId }): EventStoreState => adapter.removeOne(eventId, { ...state, error: null, loading: false })
  ),
  on(
    EventActions.DeleteEventActions.deleteEventError,
    (state, { error }): EventStoreState => ({ ...state, error, loading: false })
  )
)
