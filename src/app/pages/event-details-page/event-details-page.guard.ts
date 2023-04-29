import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Observable, first, map } from 'rxjs'
import { FetchOneEventActions } from 'src/app/features/events/store/event.actions'

@Injectable()
export class EventDetailsPageGuard implements CanActivate {
  constructor(private store: Store, private actions$: Actions) {}

  canActivate(): Observable<boolean> {
    this.store.dispatch(FetchOneEventActions.fetchCurrentEvent())
    return this.actions$.pipe(
      ofType(FetchOneEventActions.fetchOneEventSuccess),
      first(),
      map(() => true)
    )
  }
}
