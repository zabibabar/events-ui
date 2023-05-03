import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivateChild } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable, tap, filter, map } from 'rxjs'
import {
  FetchUpcomingEventsByCurrentGroupActions,
  FetchPastEventsByCurrentGroupActions
} from 'src/app/features/events/store/event.actions'
import {
  selectCurrentPastPageForCurrentGroup,
  selectCurrentUpcomingPageForCurrentGroup
} from 'src/app/features/events/store/event.selectors'

@Injectable()
export class GroupEventsPageGuard implements CanActivateChild {
  constructor(private store: Store) {}

  canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean> {
    const isPastPage = route.data['past'] as boolean
    return isPastPage ? this.hasFetchedPastEvents() : this.hasFetchedUpcomingEvents()
  }

  hasFetchedUpcomingEvents(): Observable<boolean> {
    return this.store.select(selectCurrentUpcomingPageForCurrentGroup).pipe(
      tap((page) => {
        if (page === 0)
          this.store.dispatch(FetchUpcomingEventsByCurrentGroupActions.fetchUpcomingEventsByCurrentGroup())
      }),
      filter((page) => page > 0),
      map(() => true)
    )
  }

  hasFetchedPastEvents(): Observable<boolean> {
    return this.store.select(selectCurrentPastPageForCurrentGroup).pipe(
      tap((page) => {
        if (page === 0) this.store.dispatch(FetchPastEventsByCurrentGroupActions.fetchPastEventsByCurrentGroup())
      }),
      filter((page) => page > 0),
      map(() => true)
    )
  }
}
