import { Action, ActionReducer, createReducer, on } from '@ngrx/store'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { Event } from '../interfaces/event'
import * as EventActions from './event.actions'
import * as GroupActions from '../../groups/store/group.actions'
import { EVENT_PAGE_SIZE } from '../constants/event-page-size'

export const eventFeatureSelector = 'events'

export interface EventStoreState extends EntityState<Event> {
  loading: boolean
  error: string | null
  hasMoreEvents: boolean
  currentPage: number
  hasMoreUpcomingEvents: boolean
  currentUpcomingPage: number
  hasMorePastEvents: boolean
  currentPastPage: number
  hasLoadedInitialEventsForGroup: boolean
  hasMoreUpcomingEventsForCurrentGroup: boolean
  currentUpcomingPageForCurrentGroup: number
  hasMorePastEventsForCurrentGroup: boolean
  currentPastPageForCurrentGroup: number
}

export const adapter: EntityAdapter<Event> = createEntityAdapter<Event>({
  selectId: (event: Event) => event.id,
  sortComparer: (a: Event, b: Event) => new Date(a.timeStart).getTime() - new Date(b.timeStart).getTime()
})

const initialState: EventStoreState = adapter.getInitialState({
  loading: false,
  error: null,
  hasMoreEvents: true,
  currentPage: 0,
  hasMoreUpcomingEvents: true,
  currentUpcomingPage: 0,
  hasMorePastEvents: true,
  currentPastPage: 0,
  hasLoadedInitialEventsForGroup: false,
  hasMoreUpcomingEventsForCurrentGroup: true,
  currentUpcomingPageForCurrentGroup: 0,
  hasMorePastEventsForCurrentGroup: true,
  currentPastPageForCurrentGroup: 0
})

export const eventReducer: ActionReducer<EventStoreState, Action> = createReducer(
  initialState,
  on(
    EventActions.FetchEventsActions.fetchEvents,
    EventActions.FetchNextEventsActions.fetchNextEvents,
    EventActions.FetchUpcomingEventsActions.fetchUpcomingEvents,
    EventActions.FetchNextUpcomingEventsActions.fetchNextUpcomingEvents,
    EventActions.FetchPastEventsActions.fetchPastEvents,
    EventActions.FetchNextPastEventsActions.fetchNextPastEvents,
    EventActions.FetchInitialEventsByCurrentGroupActions.fetchInitialEventsByCurrentGroup,
    EventActions.FetchUpcomingEventsByCurrentGroupActions.fetchUpcomingEventsByCurrentGroup,
    EventActions.FetchPastEventsByCurrentGroupActions.fetchPastEventsByCurrentGroup,
    EventActions.FetchOneEventActions.fetchOneEvent,
    EventActions.CreateEventActions.createEvent,
    EventActions.UpdateEventActions.updateEvent,
    EventActions.DeleteEventActions.deleteEvent,
    EventActions.AddEventAttendeeActions.addEventAttendee,
    EventActions.UpdateEventAttendeeActions.updateEventAttendee,
    EventActions.UploadEventPictureActions.uploadEventPicture,
    (state): EventStoreState => ({ ...state, loading: true })
  ),
  on(
    EventActions.FetchEventsActions.fetchEventsError,
    EventActions.FetchNextEventsActions.fetchNextEventsError,
    EventActions.FetchUpcomingEventsActions.fetchUpcomingEventsError,
    EventActions.FetchNextUpcomingEventsActions.fetchNextUpcomingEventsError,
    EventActions.FetchPastEventsActions.fetchPastEventsError,
    EventActions.FetchNextPastEventsActions.fetchNextPastEventsError,
    EventActions.FetchInitialEventsByCurrentGroupActions.fetchInitialEventsByCurrentGroupError,
    EventActions.FetchUpcomingEventsByCurrentGroupActions.fetchUpcomingEventsByCurrentGroupError,
    EventActions.FetchPastEventsByCurrentGroupActions.fetchPastEventsByCurrentGroupError,
    EventActions.FetchOneEventActions.fetchOneEventError,
    EventActions.CreateEventActions.createEventError,
    EventActions.UpdateEventActions.updateEventError,
    EventActions.DeleteEventActions.deleteEventError,
    EventActions.AddEventAttendeeActions.addEventAttendeeError,
    EventActions.UpdateEventAttendeeActions.updateEventAttendeeError,
    EventActions.UploadEventPictureActions.uploadEventPictureError,
    (state): EventStoreState => ({ ...state, loading: false })
  ),
  on(
    EventActions.FetchEventsActions.fetchEventsSuccess,
    EventActions.FetchUpcomingEventsActions.fetchUpcomingEventsSuccess,
    EventActions.FetchPastEventsActions.fetchPastEventsSuccess,
    EventActions.FetchInitialEventsByCurrentGroupActions.fetchInitialEventsByCurrentGroupSuccess,
    (state, { events }): EventStoreState =>
      adapter.upsertMany(events, { ...state, error: null, loading: false, hasLoadedInitialEventsForGroup: true })
  ),
  on(
    EventActions.FetchNextEventsActions.fetchNextEventsSuccess,
    (state, { events }): EventStoreState =>
      adapter.upsertMany(events, {
        ...state,
        error: null,
        loading: false,
        hasMoreEvents: events.length === EVENT_PAGE_SIZE,
        currentPage: events.length === 0 && state.currentPage !== 0 ? state.currentPage : state.currentPage + 1
      })
  ),
  on(
    EventActions.FetchNextUpcomingEventsActions.fetchNextUpcomingEventsSuccess,
    (state, { events }): EventStoreState =>
      adapter.upsertMany(events, {
        ...state,
        error: null,
        loading: false,
        hasMoreUpcomingEvents: events.length === EVENT_PAGE_SIZE,
        currentUpcomingPage:
          events.length === 0 && state.currentUpcomingPage !== 0
            ? state.currentUpcomingPage
            : state.currentUpcomingPage + 1
      })
  ),
  on(
    EventActions.FetchNextPastEventsActions.fetchNextPastEventsSuccess,
    (state, { events }): EventStoreState =>
      adapter.upsertMany(events, {
        ...state,
        error: null,
        loading: false,
        hasMorePastEvents: events.length === EVENT_PAGE_SIZE,
        currentPastPage:
          events.length === 0 && state.currentPastPage !== 0 ? state.currentPastPage : state.currentPastPage + 1
      })
  ),
  on(
    EventActions.FetchUpcomingEventsByCurrentGroupActions.fetchUpcomingEventsByCurrentGroupSuccess,
    (state, { events }): EventStoreState =>
      adapter.upsertMany(events, {
        ...state,
        error: null,
        loading: false,
        hasMoreUpcomingEventsForCurrentGroup: events.length === EVENT_PAGE_SIZE,
        currentUpcomingPageForCurrentGroup:
          events.length === 0 && state.currentUpcomingPageForCurrentGroup !== 0
            ? state.currentUpcomingPageForCurrentGroup
            : state.currentUpcomingPageForCurrentGroup + 1
      })
  ),
  on(
    EventActions.FetchPastEventsByCurrentGroupActions.fetchPastEventsByCurrentGroupSuccess,
    (state, { events }): EventStoreState =>
      adapter.upsertMany(events, {
        ...state,
        error: null,
        loading: false,
        hasMorePastEventsForCurrentGroup: events.length === EVENT_PAGE_SIZE,
        currentPastPageForCurrentGroup:
          events.length === 0 && state.currentPastPageForCurrentGroup !== 0
            ? state.currentPastPageForCurrentGroup
            : state.currentPastPageForCurrentGroup + 1
      })
  ),
  on(
    EventActions.FetchOneEventActions.fetchOneEventSuccess,
    EventActions.CreateEventActions.createEventSuccess,
    EventActions.UpdateEventActions.updateEventSuccess,
    (state, { event }): EventStoreState => adapter.upsertOne(event, { ...state, error: null, loading: false })
  ),
  on(
    EventActions.DeleteEventActions.deleteEventSuccess,
    (state, { eventId }): EventStoreState => adapter.removeOne(eventId, { ...state, error: null, loading: false })
  ),
  on(
    EventActions.UploadEventPictureActions.uploadEventPictureSuccess,
    (state, { eventId: id, imageUrl }): EventStoreState =>
      adapter.updateOne({ id, changes: { picture: imageUrl } }, { ...state, error: null, loading: false })
  ),
  on(
    EventActions.AddEventAttendeeActions.addEventAttendeeSuccess,
    (state, { eventId: id, attendees }): EventStoreState =>
      adapter.updateOne({ id, changes: { attendees } }, { ...state, error: null, loading: false })
  ),
  on(
    EventActions.UpdateEventAttendeeActions.updateEventAttendeeSuccess,
    (state, { eventId: id, attendees }): EventStoreState =>
      adapter.updateOne({ id, changes: { attendees } }, { ...state, error: null, loading: false })
  ),
  on(
    GroupActions.FetchGroupActions.fetchGroupSuccess,
    GroupActions.AddToGroupViaInviteCodeActions.addToGroupViaInviteCodeSuccess,
    (state): EventStoreState => ({
      ...state,
      hasLoadedInitialEventsForGroup: false,
      hasMoreUpcomingEventsForCurrentGroup: true,
      currentUpcomingPageForCurrentGroup: 0,
      hasMorePastEventsForCurrentGroup: true,
      currentPastPageForCurrentGroup: 0
    })
  )
)
