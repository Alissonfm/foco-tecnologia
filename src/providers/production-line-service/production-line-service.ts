import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudServiceProvider } from '../crud-service/crud-service';
import { Observable } from 'rxjs/Observable';
import { ConfigProviders } from '../config-providers';

/*
  Generated class for the ProductionLineServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductionLineServiceProvider extends CrudServiceProvider {

  constructor(public http: HttpClient) {
    
    super("productionlines", http);

  }

  getEquipments(id: number): Observable<any> {
  
    return this.http.get(`${ConfigProviders.API_URL}/${this.prefix_service}/${id}/equipments`);

  }
  
}
