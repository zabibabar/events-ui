import { props, createActionGroup, emptyProps } from '@ngrx/store'

export const UserAuthActions = createActionGroup({
  source: 'User Auth',
  events: {
    Init: emptyProps(),
    'Sign In': emptyProps(),
    'Sign In Completed': emptyProps(),
    'Sign In Failed': props<{ error: Error }>(),
    'Sign Out': emptyProps(),
    'Sign Out Completed': emptyProps()
  }
})
