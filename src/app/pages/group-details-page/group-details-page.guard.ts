import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router'
import { Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Observable, first, of, map } from 'rxjs'
import { FetchOneGroupActions } from 'src/app/features/groups/store/group.actions'

@Injectable()
export class GroupDetailsPageGuard implements CanActivate {
  constructor(private store: Store, private actions$: Actions) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const groupId = route.paramMap.get('groupId')
    if (!groupId) return of(false)

    this.store.dispatch(FetchOneGroupActions.fetchOneGroup({ groupId }))
    return this.actions$.pipe(
      ofType(FetchOneGroupActions.fetchOneGroupSuccess),
      first(),
      map(() => true)
    )
  }
}
