import { Component } from '@angular/core';
import { NavParams, IonicPageModule, NavController, PopoverController, ViewController } from 'ionic-angular';
import { ProductionLineDetailsPage } from '../../pages/production-line-details/production-line-details';
import { ProductionLineOcurrencyPage } from '../../pages/production-line-ocurrency/production-line-ocurrency';
import { ProductionLineReportPage } from '../../pages/production-line-report/production-line-report';

/**
 * Generated class for the PopoverWidgetComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'popover-widget',
  templateUrl: 'popover-widget.html'
})

export class PopoverWidgetComponent {

  text: string;
  line_id: number;
  itens: any;


  pages: Array< { name: string, page: IonicPageModule, lineId: number } >;

  constructor(public navParam: NavParams, public viewCtrl: ViewController) {
    this.itens = navParam.get("itens");

  }

  clickItem(item) {
    this.viewCtrl.dismiss(item)
  }

}
