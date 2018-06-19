import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionLineListPage } from './production-line-list';

@NgModule({
  declarations: [
    ProductionLineListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionLineListPage),
  ],
})
export class ProductionLineListPageModule {}
