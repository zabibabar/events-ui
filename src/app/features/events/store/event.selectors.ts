import { Dictionary } from '@ngrx/entity'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { selectRouteParams } from 'src/app/core/store/router.selectors'
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

export const selectEventById = (props: { eventId: string }) =>
  createSelector(selectEventEntities, (eventEntities: Dictionary<Event>) => eventEntities[props.eventId])
