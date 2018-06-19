import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionLineDetailsPage } from './production-line-details';

@NgModule({
  declarations: [
    ProductionLineDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionLineDetailsPage),
  ],
})
export class ProductionLineDetailsPageModule {}
