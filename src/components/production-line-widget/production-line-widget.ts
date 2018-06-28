import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductionLinePage } from '../../pages/production-line/production-line';

/**
 * Generated class for the ProductionLineWidgetComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'production-line-widget',
  templateUrl: 'production-line-widget.html'
})
export class ProductionLineWidgetComponent {

  @Input() lineData: any;

  constructor(public navCtrl: NavController){}

  openPage(){
    this.navCtrl.setRoot(ProductionLinePage, { data: this.lineData});
  }

}
