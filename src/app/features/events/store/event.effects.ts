import { Injectable } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { map, exhaustMap, catchError, tap, mergeMap } from 'rxjs/operators'
import { EventUpsertFormComponent } from '../components/event-upsert-form/event-upsert-form.component'
import { EventCreateDTO } from '../dtos/event-create-dto'
import { EventUpsertDialogData } from '../interfaces/event-upsert-dialog-data'
import { EventApiService } from '../services/event-api.service'
import * as EventActions from './event.actions'
import { selectEventById } from './event.selectors'

@Injectable()
export class EventEffects {
  private eventUpsertFormDialogRef: MatDialogRef<EventUpsertFormComponent>

  constructor(
    private actions$: Actions,
    private store: Store,
    private eventApiService: EventApiService,
    private dialog: MatDialog
  ) {}

  fetchAllEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.FetchAllEventsActions.fetchAllEvents),
      tap({ next: EventActions.FetchAllEventsActions.fetchAllEventsLoading }),
      exhaustMap(() =>
        this.eventApiService.getAllEvents().pipe(
          map((events) => EventActions.FetchAllEventsActions.fetchAllEventsSuccess({ events })),
          catchError((error) => of(EventActions.FetchAllEventsActions.fetchAllEventsError({ error })))
        )
      )
    )
  )

  createEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.CreateEventActions.createEvent),
      tap({ next: EventActions.CreateEventActions.createEventLoading }),
      exhaustMap(({ event }) =>
        this.eventApiService.createEvent(event).pipe(
          map((event) => EventActions.CreateEventActions.createEventSuccess({ event })),
          catchError((error) => of(EventActions.CreateEventActions.createEventError({ error })))
        )
      )
    )
  )

  updateEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.UpdateEventActions.updateEvent),
      tap({ next: EventActions.UpdateEventActions.updateEventLoading }),
      mergeMap(({ eventId, event }) =>
        this.eventApiService.updateEvent(eventId, event).pipe(
          map((event) => EventActions.UpdateEventActions.updateEventSuccess({ event })),
          catchError((error) => of(EventActions.UpdateEventActions.updateEventError({ error })))
        )
      )
    )
  )

  deleteEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.DeleteEventActions.deleteEvent),
      tap({ next: EventActions.DeleteEventActions.deleteEventLoading }),
      mergeMap(({ eventId }) =>
        this.eventApiService.deleteEvent(eventId).pipe(
          map(() => EventActions.DeleteEventActions.deleteEventSuccess({ eventId })),
          catchError((error) => of(EventActions.DeleteEventActions.deleteEventError({ error })))
        )
      )
    )
  )

  openEventCreateFormDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventActions.CreateEventActions.openCreateEventDialog),
        tap(
          () =>
            (this.eventUpsertFormDialogRef = this.dialog.open<EventUpsertFormComponent, EventUpsertDialogData>(
              EventUpsertFormComponent,
              {
                data: {
                  title: 'Create New Event',
                  submitText: 'Create',
                  onSubmit: (event) =>
                    this.store.dispatch(EventActions.CreateEventActions.createEvent({ event: event as EventCreateDTO }))
                }
              }
            ))
        )
      ),
    { dispatch: false }
  )

  openEventUpdateFormDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventActions.UpdateEventActions.openUpdateEventDialog),
        concatLatestFrom(({ eventId }) => this.store.select(selectEventById({ eventId }))),
        tap(
          ([{ eventId }, event]) =>
            (this.eventUpsertFormDialogRef = this.dialog.open<EventUpsertFormComponent, EventUpsertDialogData>(
              EventUpsertFormComponent,
              {
                data: {
                  event,
                  title: 'Edit Event',
                  submitText: 'Save Changes',
                  onSubmit: (event) =>
                    this.store.dispatch(EventActions.UpdateEventActions.updateEvent({ eventId, event: event }))
                }
              }
            ))
        )
      ),
    { dispatch: false }
  )

  closeEventUpsertFormDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventActions.closeUpsertFormDialog),
        tap(() => this.eventUpsertFormDialogRef.close())
      ),
    { dispatch: false }
  )
}
