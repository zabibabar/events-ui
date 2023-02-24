import { Dictionary } from '@ngrx/entity'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Event } from '../interfaces/event'
import { adapter, eventFeatureSelector, EventStoreState } from './event.reducer'

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors()

export const selectEventState = createFeatureSelector<EventStoreState>(eventFeatureSelector)

export const getSelectedUserId = (state: EventStoreState) => state.selectedEventId
export const selectEventIds = createSelector(selectEventState, selectIds)
export const selectEventEntities = createSelector(selectEventState, selectEntities)
export const selectAllEvents = createSelector(selectEventState, selectAll)
export const selectEventTotal = createSelector(selectEventState, selectTotal)
export const selectCurrentEventId = createSelector(selectEventState, getSelectedUserId)

export const selectCurrentEvent = createSelector(
  selectEventEntities,
  selectCurrentEventId,
  (eventEntities, eventId) => eventId && eventEntities[eventId]
)

export const selectEventById = (props: { eventId: string }) =>
  createSelector(selectEventEntities, (eventEntities: Dictionary<Event>) => eventEntities[props.eventId])
