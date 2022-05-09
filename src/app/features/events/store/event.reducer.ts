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

const adapter: EntityAdapter<Event> = createEntityAdapter<Event>({
  selectId: (event: Event) => event.id
})

const initialState: EventStoreState = adapter.getInitialState({
  selectedEventId: null,
  loading: false,
  error: null
})

export const eventReducer: ActionReducer<EventStoreState, Action> = createReducer(
  initialState,
  on(EventActions.fetchAllEventsLoading, (state): EventStoreState => ({ ...state, loading: true })),
  on(
    EventActions.fetchAllEventsSuccess,
    (state, { events }): EventStoreState => adapter.upsertMany(events, { ...state, error: null, loading: false })
  ),
  on(EventActions.fetchAllEventsError, (state, { error }): EventStoreState => ({ ...state, error, loading: false })),
  on(EventActions.fetchEventLoading, (state): EventStoreState => ({ ...state, loading: true })),
  on(
    EventActions.fetchEventSuccess,
    (state, { event }): EventStoreState => adapter.upsertOne(event, { ...state, error: null, loading: false })
  ),
  on(EventActions.fetchEventError, (state, { error }): EventStoreState => ({ ...state, error, loading: false })),
  on(EventActions.createEventLoading, (state): EventStoreState => ({ ...state, loading: true })),
  on(
    EventActions.createEventSuccess,
    (state, { event }): EventStoreState => adapter.upsertOne(event, { ...state, error: null, loading: false })
  ),
  on(EventActions.createEventError, (state, { error }): EventStoreState => ({ ...state, error, loading: false })),
  on(EventActions.updateEventLoading, (state): EventStoreState => ({ ...state, loading: true })),
  on(
    EventActions.updateEventSuccess,
    (state, { event }): EventStoreState => adapter.upsertOne(event, { ...state, error: null, loading: false })
  ),
  on(EventActions.updateEventError, (state, { error }): EventStoreState => ({ ...state, error, loading: false })),
  on(EventActions.deleteEventLoading, (state): EventStoreState => ({ ...state, loading: true })),
  on(
    EventActions.deleteEventSuccess,
    (state, { eventId }): EventStoreState => adapter.removeOne(eventId, { ...state, error: null, loading: false })
  ),
  on(EventActions.deleteEventError, (state, { error }): EventStoreState => ({ ...state, error, loading: false }))
)
