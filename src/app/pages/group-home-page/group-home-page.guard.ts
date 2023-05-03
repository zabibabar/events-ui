import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable, filter, tap } from 'rxjs'
import { FetchInitialEventsByCurrentGroupActions } from 'src/app/features/events/store/event.actions'
import { selectHasLoadedInitialEventsForGroup } from 'src/app/features/events/store/event.selectors'

@Injectable()
export class GroupHomePageGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectHasLoadedInitialEventsForGroup).pipe(
      tap((hasLoaded) => {
        if (!hasLoaded) this.store.dispatch(FetchInitialEventsByCurrentGroupActions.fetchInitialEventsByCurrentGroup())
      }),
      filter((hasLoaded) => hasLoaded)
    )
  }
}
