import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Observable, first, map } from 'rxjs'
import { FetchCurrentGroup, FetchOneGroupActions } from 'src/app/features/groups/store/group.actions'

@Injectable()
export class GroupDetailsPageGuard implements CanActivate {
  constructor(private store: Store, private actions$: Actions) {}

  canActivate(): Observable<boolean> {
    this.store.dispatch(FetchCurrentGroup())
    return this.actions$.pipe(
      ofType(FetchOneGroupActions.fetchOneGroupSuccess),
      first(),
      map(() => true)
    )
  }
}
