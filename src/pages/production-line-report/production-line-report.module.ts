import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionLineReportPage } from './production-line-report';

@NgModule({
  declarations: [
    ProductionLineReportPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionLineReportPage),
  ],
})
export class ProductionLineReportPageModule {}
