import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Observable, first, map } from 'rxjs'
import { FetchEventsByCurrentGroupActions } from 'src/app/features/events/store/event.actions'

@Injectable()
export class GroupHomePageGuard implements CanActivate {
  constructor(private store: Store, private actions$: Actions) {}

  canActivate(): Observable<boolean> {
    this.store.dispatch(
      FetchEventsByCurrentGroupActions.fetchEventsByCurrentGroup({ filterOptions: { upcomingLimit: 4, pastLimit: 1 } })
    )
    return this.actions$.pipe(
      ofType(FetchEventsByCurrentGroupActions.fetchEventsByCurrentGroupSuccess),
      first(),
      map(() => true)
    )
  }
}
