import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivateChild } from '@angular/router'
import { Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Observable, first, map } from 'rxjs'
import {
  FetchUpcomingEventsByCurrentGroupActions,
  FetchPastEventsByCurrentGroupActions
} from 'src/app/features/events/store/event.actions'

@Injectable()
export class GroupEventsPageGuard implements CanActivateChild {
  constructor(private store: Store, private actions$: Actions) {}

  canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean> {
    const isPastPage = route.data['past'] as boolean

    return isPastPage ? this.hasFetchedPastEvents() : this.hasFetchedUpcomingEvents()
  }

  hasFetchedUpcomingEvents(): Observable<boolean> {
    this.store.dispatch(FetchUpcomingEventsByCurrentGroupActions.fetchUpcomingEventsByCurrentGroup())
    return this.actions$.pipe(
      ofType(FetchUpcomingEventsByCurrentGroupActions.fetchUpcomingEventsByCurrentGroupSuccess),
      first(),
      map(() => true)
    )
  }

  hasFetchedPastEvents(): Observable<boolean> {
    this.store.dispatch(FetchPastEventsByCurrentGroupActions.fetchPastEventsByCurrentGroup())
    return this.actions$.pipe(
      ofType(FetchPastEventsByCurrentGroupActions.fetchPastEventsByCurrentGroupSuccess),
      first(),
      map(() => true)
    )
  }
}
