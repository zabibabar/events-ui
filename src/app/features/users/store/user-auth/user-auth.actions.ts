import { props, createActionGroup, emptyProps } from '@ngrx/store'

export const UserAuthActions = createActionGroup({
  source: 'User Auth',
  events: {
    Init: emptyProps(),
    'Sign In': props<{ returnUrl: string }>(),
    'Sign In Completed': props<{ state?: { target: string } }>(),
    'Sign In Failed': props<{ error: Error }>(),
    'Sign Out': emptyProps(),
    'Signed Out': emptyProps()
  }
})
