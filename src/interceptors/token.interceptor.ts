// import { AuthService } from './../core/service/auth.service';
import { Observable } from 'rxjs/Observable';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
// import { environment } from './../../environments/environment';
import { ConfigProviders } from '../providers/config-providers';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  
  constructor(private inj: Injector) {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestUrl: Array<any> = request.url.split('/');
    const apiUrl: Array<any> = ConfigProviders.API_URL.split('/');
    const token = localStorage.getItem('access_token');
    // const authService = this.inj.get(AuthService);
    // const user = authService.getUser();

    // if (token && (requestUrl[2] === apiUrl[2])) {
    if (requestUrl[2] === apiUrl[2]) {
      // const newRequest = request.clone({ setHeaders: {'Authorization': `Bearer ${token}`, 'companie-id': `${2}` } });
      const newRequest = request.clone({ setHeaders: {'companie-id': `1` } });
      return next.handle(newRequest);
    } else {
      return next.handle(request);
    }

  }
}
