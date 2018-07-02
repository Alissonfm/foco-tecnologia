import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { ConfigProviders } from '../providers/config-providers';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).catch((errorResponse: HttpErrorResponse) => {
      const error = (typeof errorResponse.error !== 'object') ? JSON.parse(errorResponse.error) : errorResponse;
      const requestUrl: Array<any> = request.url.split('/');
    const apiUrl: Array<any> = ConfigProviders.API_URL.split('/');
    const token = localStorage.getItem('access_token');

      if (!token && (requestUrl[2] === apiUrl[2])) {
        if (errorResponse.status === 401 && error.error === 'token_expired') {
          const http = this.injector.get(HttpClient);
          const refresh_token = localStorage.getItem('refresh_token');
          return http.post<any>(`${ConfigProviders.API_URL}/refresh`, {refresh_token: refresh_token})
          .flatMap(data => {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            const cloneRequest = request.clone({setHeaders: {'Authorization': `Bearer ${data.access_token}`}});
            
            return next.handle(cloneRequest);
          });
        }
      } 
        
        return Observable.throw(errorResponse);
    });

  }
}
