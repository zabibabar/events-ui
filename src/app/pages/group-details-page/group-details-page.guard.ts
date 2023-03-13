import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable, tap, filter, first, of, map } from 'rxjs'
import { FetchOneGroupActions } from 'src/app/features/groups/store/group.actions'
import { selectGroupById } from 'src/app/features/groups/store/group.selectors'

@Injectable()
export class GroupDetailsPageGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const groupId = route.paramMap.get('groupId')
    if (!groupId) return of(false)

    return this.store.select(selectGroupById({ groupId })).pipe(
      tap((group) => {
        if (!group) this.store.dispatch(FetchOneGroupActions.fetchOneGroup({ groupId }))
      }),
      filter((group) => !!group),
      map(() => true),
      first()
    )
  }
}
