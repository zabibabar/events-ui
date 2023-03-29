import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router'
import { Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Observable, first, of, map } from 'rxjs'
import { FetchOneEventActions } from 'src/app/features/events/store/event.actions'

@Injectable()
export class EventDetailsPageGuard implements CanActivate {
  constructor(private store: Store, private actions$: Actions) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const eventId = route.paramMap.get('eventId')
    if (!eventId) return of(false)

    this.store.dispatch(FetchOneEventActions.fetchOneEvent({ eventId }))
    return this.actions$.pipe(
      ofType(FetchOneEventActions.fetchOneEventSuccess),
      first(),
      map(() => true)
    )
  }
}
