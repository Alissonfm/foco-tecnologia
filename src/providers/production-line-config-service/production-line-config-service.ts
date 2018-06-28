import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudServiceProvider } from '../crud-service/crud-service';

/*
  Generated class for the ProductionLineConfigServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductionLineConfigServiceProvider extends CrudServiceProvider {

  constructor(public http: HttpClient) {
    super("configs", http);
  }

}
