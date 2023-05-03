import { Dictionary } from '@ngrx/entity'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { selectRouteParams } from 'src/app/core/store/router.selectors'
import { selectCurrentUser, selectCurrentUserId } from '../../users/store/user/user.selectors'
import { Event } from '../interfaces/event'
import { adapter, eventFeatureSelector, EventStoreState } from './event.reducer'

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors()

export const selectEventState = createFeatureSelector<EventStoreState>(eventFeatureSelector)

export const selectEventIds = createSelector(selectEventState, selectIds)
export const selectEventEntities = createSelector(selectEventState, selectEntities)
export const selectAllEvents = createSelector(selectEventState, selectAll)
export const selectEventTotal = createSelector(selectEventState, selectTotal)

export const selectIsLoadingEventAction = createSelector(selectEventState, (state: EventStoreState) => state.loading)

export const selectHasMoreEvents = createSelector(selectEventState, (state) => state.hasMoreEvents)
export const selectCurrentPage = createSelector(selectEventState, (state) => state.currentPage)
export const selectHasMoreUpcomingEvents = createSelector(selectEventState, (state) => state.hasMoreUpcomingEvents)
export const selectCurrentUpcomingPage = createSelector(selectEventState, (state) => state.currentUpcomingPage)
export const selectHasMorePastEvents = createSelector(selectEventState, (state) => state.hasMorePastEvents)
export const selectCurrentPastPage = createSelector(selectEventState, (state) => state.currentPastPage)

export const selectHasLoadedInitialEventsForGroup = createSelector(
  selectEventState,
  (state) => state.hasLoadedInitialEventsForGroup
)
export const selectHasMoreUpcomingEventsForCurrentGroup = createSelector(
  selectEventState,
  (state) => state.hasMoreUpcomingEventsForCurrentGroup
)
export const selectCurrentUpcomingPageForCurrentGroup = createSelector(
  selectEventState,
  (state) => state.currentUpcomingPageForCurrentGroup
)
export const selectHasMorePastEventsForCurrentGroup = createSelector(
  selectEventState,
  (state) => state.hasMorePastEventsForCurrentGroup
)
export const selectCurrentPastPageForCurrentGroup = createSelector(
  selectEventState,
  (state) => state.currentPastPageForCurrentGroup
)

export const selectCurrentEvent = createSelector(
  selectEventEntities,
  selectRouteParams,
  (eventEntities, { eventId }) => eventEntities[eventId]
)

export const selectEventById = (props: { eventId: string }) =>
  createSelector(selectEventEntities, (eventEntities: Dictionary<Event>) => eventEntities[props.eventId])

export const selectCurrentUserAsEventAttendee = ({ eventId }: { eventId: string }) =>
  createSelector(selectEventById({ eventId }), selectCurrentUser, (currentEvent, user) =>
    currentEvent?.attendees.find(({ id }) => user?.id === id)
  )

export const selectGoingAttendeesForEvent = ({ eventId }: { eventId: string }) =>
  createSelector(
    selectEventById({ eventId }),
    (event: Event | undefined) => event?.attendees.filter(({ isGoing }) => isGoing) ?? []
  )

export const selectGoingAttendeesCountForCurrentEvent = createSelector(
  selectCurrentEvent,
  (event: Event | undefined) => event?.goingAttendeesCount ?? 0
)

export const selectOrganizersForCurrentEvent = createSelector(
  selectCurrentEvent,
  (event: Event | undefined) => event?.attendees.filter(({ isOrganizer }) => isOrganizer) ?? []
)

export const selectGoingAttendeesForCurrentEvent = createSelector(
  selectCurrentEvent,
  (event: Event | undefined) => event?.attendees.filter(({ isGoing }) => isGoing) ?? []
)

export const selectNotGoingAttendeesForCurrentEvent = createSelector(
  selectCurrentEvent,
  (event: Event | undefined) => event?.attendees.filter(({ isGoing }) => !isGoing) ?? []
)

export const selectCurrentEventDescription = createSelector(
  selectCurrentEvent,
  (event: Event | undefined) => event?.description ?? ''
)

const selectEventsByCurrentGroup = createSelector(selectAllEvents, selectRouteParams, (events, { groupId }) =>
  events.filter(({ groupId: gId }) => gId === groupId)
)

export const selectUpcomingEventsByCurrentGroup = (props: { limit?: number }) =>
  createSelector(selectEventsByCurrentGroup, (events) => {
    const currentDate = new Date().getTime()
    return events
      .filter(({ timeEnd }) => new Date(timeEnd).getTime() > currentDate)
      .sort((a: Event, b: Event) => new Date(a.timeStart).getTime() - new Date(b.timeStart).getTime())
      .slice(0, props.limit)
  })

export const selectPastEventsByCurrentGroup = (props: { limit?: number }) =>
  createSelector(selectEventsByCurrentGroup, (events) => {
    const currentDate = new Date().getTime()
    return events
      .filter(({ timeEnd }) => new Date(timeEnd).getTime() < currentDate)
      .sort((a: Event, b: Event) => new Date(b.timeStart).getTime() - new Date(a.timeStart).getTime())
      .slice(0, props.limit)
  })

export const selectUpcomingEventsByCurrentUser = (props: { limit?: number; isGoing: boolean }) =>
  createSelector(selectCurrentUserId, selectAllEvents, (userId, events) => {
    const currentDate = new Date().getTime()
    let upcomingEvents = events.filter(({ timeEnd }) => new Date(timeEnd).getTime() > currentDate)
    if (props.isGoing) upcomingEvents = events.filter(({ attendees }) => attendees.some(({ id }) => id === userId))

    return upcomingEvents
      .filter(({ timeEnd }) => new Date(timeEnd).getTime() > currentDate)
      .sort((a: Event, b: Event) => new Date(a.timeStart).getTime() - new Date(b.timeStart).getTime())
      .slice(0, props.limit)
  })

export const selectPastEventsByCurrentUser = (props: { limit: number }) =>
  createSelector(selectCurrentUserId, selectAllEvents, (userId, events) => {
    const currentDate = new Date().getTime()
    let pastEvents = events.filter(({ timeEnd }) => new Date(timeEnd).getTime() > currentDate)
    pastEvents = events.filter(({ attendees }) => attendees.some(({ id }) => id === userId))

    return pastEvents
      .filter(({ timeEnd }) => new Date(timeEnd).getTime() < currentDate)
      .sort((a: Event, b: Event) => new Date(b.timeStart).getTime() - new Date(a.timeStart).getTime())
      .slice(0, props.limit)
  })
