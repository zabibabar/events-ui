import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivateChild } from '@angular/router'
import { Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Observable, first, map } from 'rxjs'
import { EventRequestFilterOptions } from 'src/app/features/events/interfaces/event-request-filter-options'
import { FetchEventsByCurrentGroupActions } from 'src/app/features/events/store/event.actions'

@Injectable()
export class GroupEventsPageGuard implements CanActivateChild {
  constructor(private store: Store, private actions$: Actions) {}

  canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean> {
    const isPastPage = route.data['past'] as boolean
    const filterOptions: EventRequestFilterOptions = {}

    if (isPastPage) filterOptions.pastLimit = 10
    else filterOptions.upcomingLimit = 10

    this.store.dispatch(FetchEventsByCurrentGroupActions.fetchEventsByCurrentGroup({ filterOptions }))
    return this.actions$.pipe(
      ofType(FetchEventsByCurrentGroupActions.fetchEventsByCurrentGroupSuccess),
      first(),
      map(() => true)
    )
  }
}
