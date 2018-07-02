import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudServiceProvider } from '../crud-service/crud-service';
import { Observable } from 'rxjs';
import { ConfigProviders } from '../config-providers';

/*
  Generated class for the SensorServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SensorServiceProvider extends CrudServiceProvider {

  constructor(public http: HttpClient) {
    super("sensors", http);
  }

  getAllRegistersById(id: number): Observable<any> {
    return this.http.get(`${ConfigProviders.API_URL}/${this.prefix_service}/${id}/registers`);
  }

  getIntervalRegisters(id: number, date: { startDate: string, endDate: string }): Observable<any> {
    return this.http.post(`${ConfigProviders.API_URL}/${this.prefix_service}/getRegisters`, {equipment_id: id, start_date: date.startDate, end_date: date.endDate});
  }

}
