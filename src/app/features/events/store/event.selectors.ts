import { Dictionary } from '@ngrx/entity'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { selectRouteParams } from 'src/app/core/store/router.selectors'
import { selectCurrentUser } from '../../users/store/user/user.selectors'
import { Event } from '../interfaces/event'
import { adapter, eventFeatureSelector, EventStoreState } from './event.reducer'

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors()

export const selectEventState = createFeatureSelector<EventStoreState>(eventFeatureSelector)

export const selectEventIds = createSelector(selectEventState, selectIds)
export const selectEventEntities = createSelector(selectEventState, selectEntities)
export const selectAllEvents = createSelector(selectEventState, selectAll)
export const selectEventTotal = createSelector(selectEventState, selectTotal)

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

export const selectGoingAttendeesCountForEvent = ({ eventId }: { eventId: string }) =>
  createSelector(
    selectEventById({ eventId }),
    (event: Event | undefined) => event?.attendees.filter(({ isGoing }) => isGoing).length ?? 0
  )

export const selectGoingAttendeesForCurrentEvent = createSelector(selectCurrentEvent, (event: Event | undefined) =>
  event?.attendees.filter(({ isGoing }) => isGoing)
)

export const selectCurrentEventDescription = createSelector(
  selectCurrentEvent,
  (event: Event | undefined) => event?.description ?? ''
)
