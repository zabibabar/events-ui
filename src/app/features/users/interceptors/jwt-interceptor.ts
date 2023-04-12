import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { UserAuthService } from '../services/user-auth.service'
import { environment } from 'src/environments/environment'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private userAuthService: UserAuthService) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.jwtInterceptor(request, next.handle)
  }

  private jwtInterceptor: HttpInterceptorFn = (request, next): Observable<HttpEvent<unknown>> => {
    if (!this.isSameDomain(request)) return next(request)

    return this.userAuthService.getAccessToken().pipe(
      map((token) =>
        request.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
          url: `${environment.restApiUrl}/${request.url}`
        })
      ),
      mergeMap((authorizedRequest) => next(authorizedRequest))
    )
  }

  private isSameDomain(request: HttpRequest<unknown>): boolean {
    const isAbsolute = /^https?:\/\//i.test(request.url)

    return !isAbsolute
  }
}
