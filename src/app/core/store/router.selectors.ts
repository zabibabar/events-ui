import { getRouterSelectors, RouterReducerState } from '@ngrx/router-store'

// `router` is used as the default feature name. You can use the feature name
// of your choice by creating a feature selector and pass it to the `getRouterSelectors` function
// export const selectRouter = createFeatureSelector<RouterReducerState>('yourFeatureName');
import { ActivatedRouteSnapshot, Params } from '@angular/router'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export const selectRouter = createFeatureSelector<RouterReducerState>('router')

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteData, // select the current route data
  selectRouteDataParam, // factory function to select a route data param
  selectUrl, // select the current url
  selectTitle // select the title if available
} = getRouterSelectors()

export const selectRouteParams = createSelector(selectRouter, (routerState) =>
  !routerState?.state?.root ? {} : getRouteParams(routerState.state.root)
)

export const selectRouteParam = (routeParam: string) =>
  createSelector(selectRouteParams, (routeParams) => {
    return routeParams[routeParam]
  })

const getRouteParams = (route: ActivatedRouteSnapshot): Params => {
  if (route.children.length === 0) {
    return route.params
  }

  const combinedChildParams = route.children.reduce(
    (prev, childRoute) => ({ ...prev, ...getRouteParams(childRoute) }),
    {}
  )
  return {
    ...route.params,
    ...combinedChildParams
  }
}
