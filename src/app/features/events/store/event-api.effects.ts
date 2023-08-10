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
  FetchPastEventsByCurrentGroupActions,
  FetchOneEventActions,
  CreateEventActions,
  UpdateEventActions,
  DeleteEventActions,
  UploadEventPictureActions,
  AddEventAttendeeActions,
  UpdateEventAttendeeActions,
  FetchEventsActions,
  FetchNextEventsActions,
  FetchUpcomingEventsActions,
  FetchNextUpcomingEventsActions,
  FetchPastEventsActions,
  FetchNextPastEventsActions,
  FetchInitialEventsByCurrentGroupActions,
  FetchUpcomingEventsByCurrentGroupActions
} from './event.actions'
import {
  selectCurrentPage,
  selectCurrentPastPage,
  selectCurrentPastPageForCurrentGroup,
  selectCurrentUpcomingPage,
  selectCurrentUpcomingPageForCurrentGroup,
  selectHasMoreEvents,
  selectHasMorePastEvents,
  selectHasMorePastEventsForCurrentGroup,
  selectHasMoreUpcomingEvents,
  selectHasMoreUpcomingEventsForCurrentGroup
} from './event.selectors'
import { EVENT_PAGE_SIZE } from '../constants/event-page-size'
import * as EventLimits from '../constants/event-limits'
import { HomePageLoaded } from 'src/app/core/store/app.actions'

@Injectable()
export class EventApiEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private eventApiService: EventApiService,
    private toast: ToastService,
    private router: Router
  ) {}

  homePageLoaded$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HomePageLoaded),
      map(() => FetchEventsActions.fetchEvents())
    )
  })

  fetchEvents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FetchEventsActions.fetchEvents),
      exhaustMap(() =>
        this.eventApiService.getEvents({ skip: 0, upcomingLimit: EVENT_PAGE_SIZE }).pipe(
          map((events) => FetchEventsActions.fetchEventsSuccess({ events })),
          catchError((error) => of(FetchEventsActions.fetchEventsError({ error })))
        )
      )
    )
  })

  fetchNextEvents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FetchNextEventsActions.fetchNextEvents),
      concatLatestFrom(() => [this.store.select(selectHasMoreEvents), this.store.select(selectCurrentPage)]),
      filter(([, hasMoreUpcoming]) => hasMoreUpcoming),
      exhaustMap(([, , currentPage]) =>
        this.eventApiService.getEvents({ skip: currentPage * EVENT_PAGE_SIZE, upcomingLimit: EVENT_PAGE_SIZE }).pipe(
          map((events) => FetchNextEventsActions.fetchNextEventsSuccess({ events })),
          catchError((error) => of(FetchNextEventsActions.fetchNextEventsError({ error })))
        )
      )
    )
  })

  fetchUpcomingEvents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FetchUpcomingEventsActions.fetchUpcomingEvents),
      exhaustMap(() =>
        this.eventApiService
          .getEvents({ skip: 0, upcomingLimit: EventLimits.UPCOMING_EVENTS_FOR_CURRENT_USER, isGoing: true })
          .pipe(
            map((events) => FetchUpcomingEventsActions.fetchUpcomingEventsSuccess({ events })),
            catchError((error) => of(FetchUpcomingEventsActions.fetchUpcomingEventsError({ error })))
          )
      )
    )
  })

  fetchNextUpcomingEvents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FetchNextUpcomingEventsActions.fetchNextUpcomingEvents),
      concatLatestFrom(() => [
        this.store.select(selectHasMoreUpcomingEvents),
        this.store.select(selectCurrentUpcomingPage)
      ]),
      filter(([, hasMoreUpcoming]) => hasMoreUpcoming),
      exhaustMap(([, , currentPage]) =>
        this.eventApiService
          .getEvents({ skip: currentPage * EVENT_PAGE_SIZE, upcomingLimit: EVENT_PAGE_SIZE, isGoing: true })
          .pipe(
            map((events) => FetchNextUpcomingEventsActions.fetchNextUpcomingEventsSuccess({ events })),
            catchError((error) => of(FetchNextUpcomingEventsActions.fetchNextUpcomingEventsError({ error })))
          )
      )
    )
  })

  fetchPastEvents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FetchPastEventsActions.fetchPastEvents),
      exhaustMap(() =>
        this.eventApiService.getEvents({ skip: 0, pastLimit: EVENT_PAGE_SIZE, isGoing: true }).pipe(
          map((events) => FetchPastEventsActions.fetchPastEventsSuccess({ events })),
          catchError((error) => of(FetchPastEventsActions.fetchPastEventsError({ error })))
        )
      )
    )
  })

  fetchNextPastEvents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FetchNextPastEventsActions.fetchNextPastEvents),
      concatLatestFrom(() => [this.store.select(selectHasMorePastEvents), this.store.select(selectCurrentPastPage)]),
      filter(([, hasMorePast]) => hasMorePast),
      exhaustMap(([, , currentPage]) =>
        this.eventApiService
          .getEvents({ skip: currentPage * EVENT_PAGE_SIZE, pastLimit: EVENT_PAGE_SIZE, isGoing: true })
          .pipe(
            map((events) => FetchNextPastEventsActions.fetchNextPastEventsSuccess({ events })),
            catchError((error) => of(FetchNextPastEventsActions.fetchNextPastEventsError({ error })))
          )
      )
    )
  })

  fetchInitialEventsByCurrentGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FetchInitialEventsByCurrentGroupActions.fetchInitialEventsByCurrentGroup),
      concatLatestFrom(() => [this.store.select(selectRouteParams)]),
      filter(([, { groupId }]) => !!groupId),
      exhaustMap(([, { groupId }]) =>
        this.eventApiService
          .getEventsByGroup(groupId, {
            upcomingLimit: EventLimits.UPCOMING_EVENTS_INITIAL_LOAD_FOR_CURRENT_GROUP,
            pastLimit: EventLimits.PAST_EVENTS_INITIAL_LOAD_FOR_CURRENT_GROUP
          })
          .pipe(
            map((events) =>
              FetchInitialEventsByCurrentGroupActions.fetchInitialEventsByCurrentGroupSuccess({ events })
            ),
            catchError((error) =>
              of(FetchInitialEventsByCurrentGroupActions.fetchInitialEventsByCurrentGroupError({ error }))
            )
          )
      )
    )
  })

  fetchUpcomingEventsByCurrentGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FetchUpcomingEventsByCurrentGroupActions.fetchUpcomingEventsByCurrentGroup),
      concatLatestFrom(() => [
        this.store.select(selectCurrentUpcomingPageForCurrentGroup),
        this.store.select(selectRouteParams),
        this.store.select(selectHasMoreUpcomingEventsForCurrentGroup)
      ]),
      filter(([, , { groupId }, hasMoreUpcoming]) => !!groupId && hasMoreUpcoming),
      exhaustMap(([, currentPage, { groupId }]) =>
        this.eventApiService
          .getEventsByGroup(groupId, { skip: currentPage * EVENT_PAGE_SIZE, upcomingLimit: EVENT_PAGE_SIZE })
          .pipe(
            map((events) =>
              FetchUpcomingEventsByCurrentGroupActions.fetchUpcomingEventsByCurrentGroupSuccess({ events })
            ),
            catchError((error) =>
              of(FetchUpcomingEventsByCurrentGroupActions.fetchUpcomingEventsByCurrentGroupError({ error }))
            )
          )
      )
    )
  })

  fetchPastEventsByCurrentGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FetchPastEventsByCurrentGroupActions.fetchPastEventsByCurrentGroup),
      concatLatestFrom(() => [
        this.store.select(selectCurrentPastPageForCurrentGroup),
        this.store.select(selectRouteParams),
        this.store.select(selectHasMorePastEventsForCurrentGroup)
      ]),
      filter(([, , { groupId }, hasMorePast]) => !!groupId && hasMorePast),
      exhaustMap(([, currentPage, { groupId }]) =>
        this.eventApiService
          .getEventsByGroup(groupId, { skip: currentPage * EVENT_PAGE_SIZE, pastLimit: EVENT_PAGE_SIZE })
          .pipe(
            map((events) => FetchPastEventsByCurrentGroupActions.fetchPastEventsByCurrentGroupSuccess({ events })),
            catchError((error) =>
              of(FetchPastEventsByCurrentGroupActions.fetchPastEventsByCurrentGroupError({ error }))
            )
          )
      )
    )
  })

  fetchCurrentEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FetchOneEventActions.fetchCurrentEvent),
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
          tap(({ event }) => this.router.navigate(['groups', event.groupId, 'events', event.id])),
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
