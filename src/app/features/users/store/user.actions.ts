import { props, createActionGroup, emptyProps } from '@ngrx/store'
import { User } from '../interfaces/user'

export const UserAuthActions = createActionGroup({
  source: 'User Auth',
  events: {
    Init: emptyProps(),
    'Sign In': props<{ returnUrl: string }>(),
    'Sign In Completed': props<{ state: { target: string } }>(),
    'Signed In': props<{ user: User }>(),
    'Sign In Failed': props<{ error: Error }>(),
    'Sign Out': emptyProps(),
    'Signed Out': emptyProps()
  }
})
