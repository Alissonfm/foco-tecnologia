import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudServiceProvider } from '../crud-service/crud-service';
import { ConfigProviders } from '../config-providers';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the EquipmentServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EquipmentServiceProvider extends CrudServiceProvider {

  constructor(public http: HttpClient) {
    super("equipments", http);
  }

  getAllSensorRegister(exId: number, data: any): Observable<any> {
    return this.http.post(`${ConfigProviders.API_URL}/${this.prefix_service}/getAllSensorsRegisters`, {equipment_id: exId, start_date: data.startDate, end_date: data.endDate });
  }

  getSensorsOnly(id: number) {
    return this.http.get(`${ConfigProviders.API_URL}/${this.prefix_service}/${id}/sensors`);
  }

}
