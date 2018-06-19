import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionLinePage } from './production-line';

@NgModule({
  declarations: [
    ProductionLinePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionLinePage),
  ],
})
export class ProductionLinePageModule {}
