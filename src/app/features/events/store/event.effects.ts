import { Injectable } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { map, exhaustMap, catchError, tap, mergeMap, filter } from 'rxjs/operators'
import { selectRouteParams } from 'src/app/core/store/router.selectors'
import { DialogType } from 'src/app/shared/dialog/dialog-type.enum'
import { DialogService } from 'src/app/shared/dialog/dialog.service'
import { UploadImageComponent } from 'src/app/shared/upload-image/upload-image'
import { EventUpsertFormComponent } from '../components/event-upsert-form/event-upsert-form.component'
import { EventCreateDto } from '../dtos/event-create-dto'
import { EventUpsertDialogData } from '../interfaces/event-upsert-dialog-data'
import { EventApiService } from '../services/event-api.service'
import * as EventActions from './event.actions'
import { selectEventById } from './event.selectors'

@Injectable()
export class EventEffects {
  private eventUpsertFormDialogRef: MatDialogRef<EventUpsertFormComponent>
  private eventImageUploadDialogRef: MatDialogRef<UploadImageComponent>

  constructor(
    private actions$: Actions,
    private store: Store,
    private eventApiService: EventApiService,
    private dialog: DialogService
  ) {}

  fetchAllEvents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventActions.FetchAllEventsActions.fetchAllEvents),
      exhaustMap(() =>
        this.eventApiService.getAllEvents().pipe(
          map((events) => EventActions.FetchAllEventsActions.fetchAllEventsSuccess({ events })),
          catchError((error) => of(EventActions.FetchAllEventsActions.fetchAllEventsError({ error })))
        )
      )
    )
  })

  fetchEventsByCurrentGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventActions.FetchEventsByCurrentGroupActions.fetchEventsByCurrentGroup),
      concatLatestFrom(() => this.store.select(selectRouteParams)),
      filter(([, { groupId }]) => !!groupId),
      exhaustMap(([, { groupId }]) =>
        this.eventApiService.getEventsByGroup(groupId).pipe(
          map((events) => EventActions.FetchEventsByCurrentGroupActions.fetchEventsByCurrentGroupSuccess({ events })),
          catchError((error) =>
            of(EventActions.FetchEventsByCurrentGroupActions.fetchEventsByCurrentGroupError({ error }))
          )
        )
      )
    )
  })

  fetchCurrentEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventActions.FetchCurrentEvent),
      concatLatestFrom(() => this.store.select(selectRouteParams)),
      filter(([, { eventId }]) => !!eventId),
      map(([, { eventId }]) => EventActions.FetchOneEventActions.fetchOneEvent({ eventId }))
    )
  })

  fetchOneEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventActions.FetchOneEventActions.fetchOneEvent),
      exhaustMap(({ eventId }) =>
        this.eventApiService.getEventById(eventId).pipe(
          map((event) => EventActions.FetchOneEventActions.fetchOneEventSuccess({ event })),
          catchError((error) => of(EventActions.FetchOneEventActions.fetchOneEventError({ error })))
        )
      )
    )
  })

  createEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventActions.CreateEventActions.createEvent),
      exhaustMap(({ event }) =>
        this.eventApiService.createEvent(event).pipe(
          map((event) => EventActions.CreateEventActions.createEventSuccess({ event })),
          catchError((error) => of(EventActions.CreateEventActions.createEventError({ error })))
        )
      )
    )
  })

  updateEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventActions.UpdateEventActions.updateEvent),
      mergeMap(({ eventId, event }) =>
        this.eventApiService.updateEvent(eventId, event).pipe(
          map((event) => EventActions.UpdateEventActions.updateEventSuccess({ event })),
          catchError((error) => of(EventActions.UpdateEventActions.updateEventError({ error })))
        )
      )
    )
  })

  deleteEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventActions.DeleteEventActions.deleteEvent),
      mergeMap(({ eventId }) =>
        this.eventApiService.deleteEvent(eventId).pipe(
          map(() => EventActions.DeleteEventActions.deleteEventSuccess({ eventId })),
          catchError((error) => of(EventActions.DeleteEventActions.deleteEventError({ error })))
        )
      )
    )
  })

  openEventCreateFormDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(EventActions.CreateEventActions.openCreateEventDialog),
        tap(
          () =>
            (this.eventUpsertFormDialogRef = this.dialog.openForm<EventUpsertFormComponent, EventUpsertDialogData>(
              EventUpsertFormComponent,
              {
                type: DialogType.FORM,
                data: {
                  title: 'Create New Event',
                  submitText: 'Create',
                  onSubmit: (event) =>
                    // eslint-disable-next-line @ngrx/no-dispatch-in-effects
                    this.store.dispatch(EventActions.CreateEventActions.createEvent({ event: event as EventCreateDto }))
                }
              }
            ))
        )
      )
    },
    { dispatch: false }
  )

  openEventUpdateFormDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(EventActions.UpdateEventActions.openUpdateEventDialog),
        concatLatestFrom(({ eventId }) => this.store.select(selectEventById({ eventId }))),
        tap(
          ([{ eventId }, event]) =>
            (this.eventUpsertFormDialogRef = this.dialog.openForm<EventUpsertFormComponent, EventUpsertDialogData>(
              EventUpsertFormComponent,
              {
                type: DialogType.FORM,
                data: {
                  event,
                  title: 'Edit Event',
                  submitText: 'Save Changes',
                  onSubmit: (event) =>
                    // eslint-disable-next-line @ngrx/no-dispatch-in-effects
                    this.store.dispatch(EventActions.UpdateEventActions.updateEvent({ eventId, event: event }))
                }
              }
            ))
        )
      )
    },
    { dispatch: false }
  )

  closeEventUpsertFormDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          EventActions.CloseUpsertEventFormDialog,
          EventActions.CreateEventActions.createEventSuccess,
          EventActions.UpdateEventActions.updateEventSuccess
        ),
        tap(() => this.eventUpsertFormDialogRef.close())
      )
    },
    { dispatch: false }
  )

  uploadEventPicture$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventActions.UploadEventPictureActions.uploadEventPicture),
      mergeMap(({ eventId, imageFile }) =>
        this.eventApiService.uploadEventPicture(eventId, imageFile).pipe(
          map((imageUrl) => EventActions.UploadEventPictureActions.uploadEventPictureSuccess({ eventId, imageUrl })),
          catchError((error) => of(EventActions.UploadEventPictureActions.uploadEventPictureError({ error })))
        )
      )
    )
  })

  openUploadEventPictureDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(EventActions.UploadEventPictureActions.openUploadEventPictureDialog),
        tap((action) => (this.eventImageUploadDialogRef = this.dialog.openUploadImage(action.data)))
      )
    },
    { dispatch: false }
  )

  closeUploadEventPictureDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(EventActions.UploadEventPictureActions.uploadEventPictureSuccess),
        tap(() => this.eventImageUploadDialogRef.close())
      )
    },
    { dispatch: false }
  )

  updateEventAttendee$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventActions.UpdateEventAttendeeActions.updateEventAttendee),
      mergeMap(({ eventId, attendee }) =>
        this.eventApiService.updateEventAttendee(eventId, attendee).pipe(
          map((attendees) =>
            EventActions.UpdateEventAttendeeActions.updateEventAttendeeSuccess({ eventId, attendees })
          ),
          catchError((error) => of(EventActions.UpdateEventAttendeeActions.updateEventAttendeeError({ error })))
        )
      )
    )
  })
}
