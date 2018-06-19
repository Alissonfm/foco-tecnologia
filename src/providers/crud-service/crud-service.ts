import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigProviders } from '../config-providers';

/*
  Generated class for the CrudServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class CrudServiceProvider {

  prefix_service: string;

  constructor(prefix: string, public http: HttpClient) {
    this.prefix_service = prefix;
  }

  public getData(data): Observable<any> {

    if (data.page && data.qtd) {
      return this.http.get(`${ConfigProviders.API_URL}/${this.prefix_service}?page=${data.page}&qtd=${data.qtd}`);
    }
  
    if (data.page) {
      return this.http.get(`${ConfigProviders.API_URL}/${this.prefix_service}?page=${data.page}`);
    }
  
    if (data.qtd) {

      if (data.qtd === -1) {
        return this.http.get(`${ConfigProviders.API_URL}/${this.prefix_service}/getAll`);
      }
    
      return this.http.get(`${ConfigProviders.API_URL}/${this.prefix_service}?qtd=${data.qtd}`);
    
    }

    return this.http.get(`${ConfigProviders.API_URL}/${this.prefix_service}`);
  }
  
  public create(data: any): Observable<any> {
    return this.http.post(`${ConfigProviders.API_URL}/${this.prefix_service}`, data);
  }
  
  
  public update(id: number, data: any): Observable<any> {
    return this.http.put(`${ConfigProviders.API_URL}/${this.prefix_service}/${id}`, data);
  }
  
  
  public get(id: number): Observable<any> {
    return this.http.get(`${ConfigProviders.API_URL}/${this.prefix_service}/${id}`);
  }
  
  
  public remove(id: number): Observable<any> {
    return this.http.delete(`${ConfigProviders.API_URL}/${this.prefix_service}/${id}`);
  }

}
