import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProviders } from '../config-providers';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the CtSettingServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class CtSettingServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CtSettingServiceProvider Provider');
  }

  getAll(): Observable<any[]> {
    return this.http.get<any>(`${ ConfigProviders.API_URL }/settings`);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${ConfigProviders.API_URL}/settings/${id}`);
  }

  create(user: any): Observable<any> {
    return this.http.post<any>(`${ConfigProviders.API_URL}/settings`, user);
  }

  getByName(user: any): Observable<any> {
    return this.http.post<any>(`${ConfigProviders.API_URL}/settings/byName`, user);
  }

  getByNames(user: any): Observable<any> {
    return this.http.post<any>(`${ConfigProviders.API_URL}/settings/byNames`, user);
  }

  getByGroup(user: any): Observable<any> {
    return this.http.post<any>(`${ConfigProviders.API_URL}/settings/group`, user);
  }

  update(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${ConfigProviders.API_URL}/settings/${id}`, user);
  }

  remove(id: number): Observable<any> {
    return this.http.delete<any>(`${ConfigProviders.API_URL}/settings/${id}`);
  }

}
