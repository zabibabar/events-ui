import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { Actions } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Observable, filter, map, tap } from 'rxjs'
import { FetchGroupsActions } from 'src/app/features/groups/store/group.actions'
import { selectGroupsTotal } from 'src/app/features/groups/store/group.selectors'

@Injectable()
export class GroupsPageGuard implements CanActivate {
  constructor(private store: Store, private actions$: Actions) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectGroupsTotal).pipe(
      tap((count) => {
        if (count === 0) this.store.dispatch(FetchGroupsActions.fetchGroups())
      }),
      filter((count) => count > 0),
      map(() => true)
    )
  }
}
