/* eslint @ngrx/no-dispatch-in-effects: 0 */
import { Injectable } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { DialogType } from 'src/app/shared/dialog/dialog-type.enum'
import { DialogService } from 'src/app/shared/dialog/dialog.service'
import { UploadImageComponent } from 'src/app/shared/upload-image/upload-image'
import { EventUpsertFormComponent } from '../components/event-upsert-form/event-upsert-form.component'
import { EventCreateDto } from '../dtos/event-create-dto'
import { EventUpsertDialogData } from '../interfaces/event-upsert-dialog-data'
import { selectCurrentUserAsEventAttendee, selectEventById, selectIsLoadingEventAction } from './event.selectors'
import { filter, map, tap } from 'rxjs'
import {
  CreateEventActions,
  UpdateEventActions,
  CloseUpsertEventFormDialog,
  UploadEventPictureActions,
  DeleteEventActions,
  UpdateEventAttendeeActions,
  CloseUpsertAttendeeFormDialog
} from './event.actions'
import { DialogConfirmationComponent } from 'src/app/shared/dialog-confirmation/dialog-confirmation'
import { Event } from '../interfaces/event'
import { EventAttendeeUpsertFormComponent } from '../components/event-attendee-upsert-form/event-attendee-upsert-form.component'
import { EventAttendeeUpsertDialogData } from '../interfaces/event-attendee-upsert-dialog-data'
import { Attendee } from '../interfaces/attendee'

@Injectable()
export class EventUiEffects {
  private eventUpsertFormDialogRef: MatDialogRef<EventUpsertFormComponent>
  private eventAttendeeUpsertFormDialogRef: MatDialogRef<EventAttendeeUpsertFormComponent>
  private eventImageUploadDialogRef: MatDialogRef<UploadImageComponent>
  private confirmationDialogRef: MatDialogRef<DialogConfirmationComponent>

  constructor(private actions$: Actions, private store: Store, private dialog: DialogService) {}

  openEventCreateFormDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CreateEventActions.openCreateEventDialog),
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
                    this.store.dispatch(CreateEventActions.createEvent({ event: event as EventCreateDto }))
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
        ofType(UpdateEventActions.openUpdateEventDialog),
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
                    this.store.dispatch(UpdateEventActions.updateEvent({ eventId, event: event }))
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
          CloseUpsertEventFormDialog,
          CreateEventActions.createEventSuccess,
          UpdateEventActions.updateEventSuccess
        ),
        tap(() => this.eventUpsertFormDialogRef.close())
      )
    },
    { dispatch: false }
  )

  openAttendeeUpdateFormDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UpdateEventAttendeeActions.openUpsertAttendeeDialog),
        concatLatestFrom(({ eventId }) => this.store.select(selectCurrentUserAsEventAttendee({ eventId }))),
        filter(([, attendee]) => attendee !== undefined),
        tap(
          ([{ eventId, attendeeId }, attendee]) =>
            (this.eventAttendeeUpsertFormDialogRef = this.dialog.openForm<
              EventAttendeeUpsertFormComponent,
              EventAttendeeUpsertDialogData
            >(EventAttendeeUpsertFormComponent, {
              type: DialogType.FORM,
              data: {
                attendee: attendee as Attendee,
                title: 'Edit RSVP',
                submitText: 'Save Changes',
                onSubmit: (changes) =>
                  // eslint-disable-next-line @ngrx/no-dispatch-in-effects
                  this.store.dispatch(UpdateEventAttendeeActions.updateEventAttendee({ eventId, attendeeId, changes }))
              }
            }))
        )
      )
    },
    { dispatch: false }
  )

  attendeeUpsertFormDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CloseUpsertAttendeeFormDialog, UpdateEventAttendeeActions.updateEventAttendeeSuccess),
        tap(() => this.eventAttendeeUpsertFormDialogRef.close())
      )
    },
    { dispatch: false }
  )

  openUploadEventPictureDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UploadEventPictureActions.openUploadEventPictureDialog),
        tap((action) => (this.eventImageUploadDialogRef = this.dialog.openUploadImage(action.data)))
      )
    },
    { dispatch: false }
  )

  closeUploadEventPictureDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UploadEventPictureActions.uploadEventPictureSuccess),
        tap(() => this.eventImageUploadDialogRef.close())
      )
    },
    { dispatch: false }
  )

  openDeleteEventDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DeleteEventActions.openDeleteEventDialog),
        concatLatestFrom(({ eventId }) => this.store.select(selectEventById({ eventId }))),
        filter(([, event]) => !!event),
        map(([, event]) => event as Event),
        tap((event) => {
          this.confirmationDialogRef = this.dialog.openConfirmationDialog({
            type: 'error',
            title: 'You are about to delete an event?',
            message: 'This will permanently delete the event from your group.',
            primaryCTA: 'Delete Event',
            onSubmit: () => this.store.dispatch(DeleteEventActions.deleteEvent({ eventId: event.id })),
            isLoading$: this.store.select(selectIsLoadingEventAction)
          })
        })
      )
    },
    { dispatch: false }
  )

  closeConfirmationDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DeleteEventActions.deleteEventError, DeleteEventActions.deleteEventSuccess),
        tap(() => this.confirmationDialogRef.close())
      )
    },
    { dispatch: false }
  )
}
