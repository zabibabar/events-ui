import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { UserAuthService } from '../services/user-auth.service'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return jwtInterceptor(request, next.handle)
  }
}

const jwtInterceptor: HttpInterceptorFn = (request, next): Observable<HttpEvent<unknown>> => {
  if (!isSameDomain(request)) return next(request)

  return inject(UserAuthService)
    .getAccessToken()
    .pipe(
      map((token) => request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })),
      mergeMap((authorizedRequest) => next(authorizedRequest))
    )
}

function isSameDomain(request: HttpRequest<unknown>): boolean {
  const isAbsolute = /^https?:\/\//i.test(request.url)

  return !isAbsolute
}
