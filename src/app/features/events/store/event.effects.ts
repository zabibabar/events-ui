import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { map, exhaustMap, catchError, tap, mergeMap } from 'rxjs/operators'
import { EventApiService } from '../services/event-api.service'
import * as EventActions from './event.actions'

@Injectable()
export class EventEffects {
  constructor(private actions$: Actions, private eventApiService: EventApiService) {}

  fetchAllEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.fetchAllEvents),
      tap({ next: EventActions.fetchAllEventsLoading }),
      exhaustMap(() =>
        this.eventApiService.getAllEvents().pipe(
          map((events) => EventActions.fetchAllEventsSuccess({ events })),
          catchError((error) => of(EventActions.fetchAllEventsError({ error })))
        )
      )
    )
  )

  fetchEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.fetchEvent),
      tap({ next: EventActions.fetchEventLoading }),
      exhaustMap(({ eventId }) =>
        this.eventApiService.getEvent(eventId).pipe(
          map((event) => EventActions.fetchEventSuccess({ event })),
          catchError((error) => of(EventActions.fetchEventError({ error })))
        )
      )
    )
  )

  createEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.createEvent),
      tap({ next: EventActions.createEventLoading }),
      exhaustMap(({ event }) =>
        this.eventApiService.createEvent(event).pipe(
          map((event) => EventActions.createEventSuccess({ event })),
          catchError((error) => of(EventActions.createEventError({ error })))
        )
      )
    )
  )

  updateEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.updateEvent),
      tap({ next: EventActions.updateEventLoading }),
      mergeMap(({ eventId, event }) =>
        this.eventApiService.updateEvent(eventId, event).pipe(
          map((event) => EventActions.updateEventSuccess({ event })),
          catchError((error) => of(EventActions.updateEventError({ error })))
        )
      )
    )
  )

  deleteEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.deleteEvent),
      tap({ next: EventActions.deleteEventLoading }),
      mergeMap(({ eventId }) =>
        this.eventApiService.deleteEvent(eventId).pipe(
          map(() => EventActions.deleteEventSuccess({ eventId })),
          catchError((error) => of(EventActions.deleteEventError({ error })))
        )
      )
    )
  )

  addAttendees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.addAttendees),
      tap({ next: EventActions.addAttendeesLoading }),
      mergeMap(({ eventId, attendeeIds }) =>
        this.eventApiService.addEventAttendees(eventId, attendeeIds).pipe(
          map((attendees) => EventActions.addAttendeesSuccess({ attendees })),
          catchError((error) => of(EventActions.addAttendeesError({ error })))
        )
      )
    )
  )

  removeAttendees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.removeAttendees),
      tap({ next: EventActions.removeAttendeesLoading }),
      mergeMap(({ eventId, attendeeIds }) =>
        this.eventApiService.removeEventAttendee(eventId, attendeeIds).pipe(
          map(() => EventActions.removeAttendeesSuccess({ attendeeIds })),
          catchError((error) => of(EventActions.removeAttendeesError({ error })))
        )
      )
    )
  )
}
