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

export const selectIsLoading = createSelector(selectEventState, (state: EventStoreState) => state.loading)

export const selectCurrentEvent = createSelector(
  selectEventEntities,
  selectRouteParams,
  (eventEntities, { eventId }) => eventEntities[eventId]
)

export const selectEventsByCurrentGroup = createSelector(selectAllEvents, selectRouteParams, (events, { groupId }) =>
  events.filter(({ groupId: gId }) => gId === groupId)
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

export const selectUpcomingEventsByCurrentGroup = (props: { limit: number }) =>
  createSelector(selectEventsByCurrentGroup, (events) => {
    const currentDate = new Date().getTime()
    return events
      .filter(({ timeEnd }) => new Date(timeEnd).getTime() > currentDate)
      .sort((a: Event, b: Event) => new Date(a.timeStart).getTime() - new Date(b.timeStart).getTime())
      .slice(0, props.limit)
  })

export const selectPastEventsByCurrentGroup = (props: { limit: number }) =>
  createSelector(selectEventsByCurrentGroup, (events) => {
    const currentDate = new Date().getTime()
    return events
      .filter(({ timeEnd }) => new Date(timeEnd).getTime() < currentDate)
      .sort((a: Event, b: Event) => new Date(b.timeStart).getTime() - new Date(a.timeStart).getTime())
      .slice(0, props.limit)
  })

export const selectUpcomingEventsByCurrentUser = (props: { limit: number; isAttending: boolean }) =>
  createSelector(selectCurrentUserId, selectAllEvents, (userId, events) => {
    const currentDate = new Date().getTime()
    let upcomingEvents = events.filter(({ timeEnd }) => new Date(timeEnd).getTime() > currentDate)
    if (props.isAttending) upcomingEvents = events.filter(({ attendees }) => attendees.some(({ id }) => id === userId))

    return upcomingEvents
      .filter(({ timeEnd }) => new Date(timeEnd).getTime() > currentDate)
      .sort((a: Event, b: Event) => new Date(a.timeStart).getTime() - new Date(b.timeStart).getTime())
      .slice(0, props.limit)
  })
