import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudServiceProvider } from '../crud-service/crud-service';
import { ConfigProviders } from '../config-providers';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the OcurrencyServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OcurrencyServiceProvider extends CrudServiceProvider {

  constructor(public http: HttpClient) {
    super("incidents", http);
  }

  getOcurrencyList(data: {production_line_id: number, start_date: string, end_date: string}): Observable<any> {
    return this.http.post(`${ConfigProviders.API_URL}/${this.prefix_service}/list`, data)
  }

  // Ocurrency parameters
  /*
  'production_line_id' => 'required|numeric|exists:incidents,id',            
  'start_date' => 'required|date'.(isset($request->start_date) ?"|before_or_equal:end_date":""),
  'end_date' => 'nullable|date',
  */

}
