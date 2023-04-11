import { Injectable } from '@angular/core'
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { map, exhaustMap, catchError, tap, mergeMap, filter } from 'rxjs/operators'
import { selectRouteParams } from 'src/app/core/store/router.selectors'
import { EventApiService } from '../services/event-api.service'
import { ToastService } from 'src/app/shared/toast'
import { Router } from '@angular/router'
import {
  FetchEventsByCurrentGroupActions,
  FetchCurrentEvent,
  FetchOneEventActions,
  CreateEventActions,
  UpdateEventActions,
  DeleteEventActions,
  UploadEventPictureActions,
  AddEventAttendeeActions,
  UpdateEventAttendeeActions,
  FetchAllEventsActions
} from './event.actions'

@Injectable()
export class EventApiEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private eventApiService: EventApiService,
    private toast: ToastService,
    private router: Router
  ) {}

  fetchAllEvents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FetchAllEventsActions.fetchAllEvents),
      exhaustMap(({ filterOptions }) =>
        this.eventApiService.getAllEvents(filterOptions).pipe(
          map((events) => FetchAllEventsActions.fetchAllEventsSuccess({ events })),
          catchError((error) => of(FetchAllEventsActions.fetchAllEventsError({ error })))
        )
      )
    )
  })

  fetchEventsByCurrentGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FetchEventsByCurrentGroupActions.fetchEventsByCurrentGroup),
      concatLatestFrom(() => this.store.select(selectRouteParams)),
      filter(([, { groupId }]) => !!groupId),
      exhaustMap(([{ filterOptions }, { groupId }]) =>
        this.eventApiService.getEventsByGroup(groupId, filterOptions).pipe(
          map((events) => FetchEventsByCurrentGroupActions.fetchEventsByCurrentGroupSuccess({ events })),
          catchError((error) => of(FetchEventsByCurrentGroupActions.fetchEventsByCurrentGroupError({ error })))
        )
      )
    )
  })

  fetchCurrentEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FetchCurrentEvent),
      concatLatestFrom(() => this.store.select(selectRouteParams)),
      filter(([, { eventId }]) => !!eventId),
      map(([, { eventId }]) => FetchOneEventActions.fetchOneEvent({ eventId }))
    )
  })

  fetchOneEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FetchOneEventActions.fetchOneEvent),
      exhaustMap(({ eventId }) =>
        this.eventApiService.getEventById(eventId).pipe(
          map((event) => FetchOneEventActions.fetchOneEventSuccess({ event })),
          catchError((error) => of(FetchOneEventActions.fetchOneEventError({ error })))
        )
      )
    )
  })

  createEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CreateEventActions.createEvent),
      exhaustMap(({ event }) =>
        this.eventApiService.createEvent(event).pipe(
          map((event) => CreateEventActions.createEventSuccess({ event })),
          tap(() => this.toast.success('Event Created Successfully!')),
          tap(({ event }) => this.router.navigate(['events', event.id])),
          catchError((error) => of(CreateEventActions.createEventError({ error })))
        )
      )
    )
  })

  updateEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UpdateEventActions.updateEvent),
      mergeMap(({ eventId, event }) =>
        this.eventApiService.updateEvent(eventId, event).pipe(
          map((event) => UpdateEventActions.updateEventSuccess({ event })),
          tap(() => this.toast.success('Event Updated Successfully!')),
          catchError((error) => of(UpdateEventActions.updateEventError({ error })))
        )
      )
    )
  })

  deleteEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeleteEventActions.deleteEvent),
      mergeMap(({ eventId }) =>
        this.eventApiService.deleteEvent(eventId).pipe(
          map(() => DeleteEventActions.deleteEventSuccess({ eventId })),
          tap(() => this.toast.success('Event Deleted Successfully!')),
          tap(() => this.router.navigate(['events'])),
          catchError((error) => of(DeleteEventActions.deleteEventError({ error })))
        )
      )
    )
  })

  uploadEventPicture$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UploadEventPictureActions.uploadEventPicture),
      mergeMap(({ eventId, imageFile }) =>
        this.eventApiService.uploadEventPicture(eventId, imageFile).pipe(
          map((imageUrl) => UploadEventPictureActions.uploadEventPictureSuccess({ eventId, imageUrl })),
          tap(() => this.toast.success('Event Picture Updated Successfully!')),
          catchError((error) => of(UploadEventPictureActions.uploadEventPictureError({ error })))
        )
      )
    )
  })

  addEventAttendee$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AddEventAttendeeActions.addEventAttendee),
      mergeMap(({ eventId, userId }) =>
        this.eventApiService.addEventAttendee(eventId, userId).pipe(
          map((attendees) => AddEventAttendeeActions.addEventAttendeeSuccess({ eventId, attendees })),
          tap(() => this.toast.success('RSVP Was Updated Successfully!')),
          catchError((error) => of(AddEventAttendeeActions.addEventAttendeeError({ error })))
        )
      )
    )
  })

  updateEventAttendee$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UpdateEventAttendeeActions.updateEventAttendee),
      mergeMap(({ eventId, attendeeId, changes }) =>
        this.eventApiService.updateEventAttendee(eventId, attendeeId, changes).pipe(
          map((attendees) => UpdateEventAttendeeActions.updateEventAttendeeSuccess({ eventId, attendees })),
          tap(() => this.toast.success('RSVP Was Updated Successfully!')),
          catchError((error) => of(UpdateEventAttendeeActions.updateEventAttendeeError({ error })))
        )
      )
    )
  })
}
