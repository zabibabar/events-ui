import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable, tap, filter, first, of, map } from 'rxjs'
import { FetchOneEventActions } from 'src/app/features/events/store/event.actions'
import { selectEventById } from 'src/app/features/events/store/event.selectors'

@Injectable()
export class EventDetailsPageGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const eventId = route.paramMap.get('eventId')
    if (!eventId) return of(false)

    return this.store.select(selectEventById({ eventId })).pipe(
      tap((event) => {
        if (!event) this.store.dispatch(FetchOneEventActions.fetchOneEvent({ eventId }))
      }),
      filter((event) => !!event),
      map(() => true),
      first()
    )
  }
}
