import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Observable, first, map } from 'rxjs'
import { FetchGroupActions } from 'src/app/features/groups/store/group.actions'

@Injectable()
export class GroupDetailsPageGuard implements CanActivate {
  constructor(private store: Store, private actions$: Actions) {}

  canActivate(): Observable<boolean> {
    this.store.dispatch(FetchGroupActions.fetchGroup())
    return this.actions$.pipe(
      ofType(FetchGroupActions.fetchGroupSuccess),
      first(),
      map(() => true)
    )
  }
}
