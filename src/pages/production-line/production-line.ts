import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, IonicPageModule } from 'ionic-angular';
import { PopoverWidgetComponent } from '../../components/popover-widget/popover-widget';
import { ProductionLineServiceProvider } from '../../providers/production-line-service/production-line-service';
import { ProductionLineDetailsPage } from '../production-line-details/production-line-details';
import { ProductionLineOcurrencyPage } from '../production-line-ocurrency/production-line-ocurrency';
import { ProductionLineReportPage } from '../production-line-report/production-line-report';

/**
 * Generated class for the ProductionLinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-production-line',
  templateUrl: 'production-line.html',
})
export class ProductionLinePage {

  prodline: any;
  equipmentsData: any;
  requestInfo: any; 


  pgInfo: IonicPageModule;
  pgOcur: IonicPageModule;
  pgRepor: IonicPageModule;

  itensPopOver = [
    { name: "Informações", page: ProductionLineDetailsPage },
    { name: "Ocorrências", page: ProductionLineOcurrencyPage },
    { name: "Relatório", page: ProductionLineReportPage}
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public prodServices: ProductionLineServiceProvider) {
    this.prodline = this.navParams.get("data");
    this.requestInfo = { startDate: "2018-06-07 00:00:00", endDate: "2018-06-07 23:59:59"};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductionLinePage');
    console.log(this.prodline);

    // Metodo que pega todos os equipamentos da linha de produção.
    this.prodServices.getEquipments(this.prodline.id).subscribe( (response) => {
      this.prodline.equipments = response;
    })
  }

  openPopover(ev){
    let popover = this.popoverCtrl.create(PopoverWidgetComponent, {itens: this.itensPopOver} );
    popover.present({
      ev: ev
    });

    popover.onDidDismiss((item) => {
      this.navCtrl.push(item.page, {lineId: this.prodline.equipments.id});
    })
  }
}
