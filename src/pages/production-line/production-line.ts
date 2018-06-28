import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, IonicPageModule } from 'ionic-angular';
import { PopoverWidgetComponent } from '../../components/popover-widget/popover-widget';
import { ProductionLineServiceProvider } from '../../providers/production-line-service/production-line-service';
import { ProductionLineDetailsPage } from '../production-line-details/production-line-details';
import { ProductionLineOcurrencyPage } from '../production-line-ocurrency/production-line-ocurrency';
import { ProductionLineReportPage } from '../production-line-report/production-line-report';
import { AlertMessagesProvider } from '../../providers/alert-messages/alert-messages';

/**
 * Generated class for the ProductionLinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var $: any;

@IonicPage()
@Component({
  selector: 'page-production-line',
  templateUrl: 'production-line.html',
})
export class ProductionLinePage {

  prodline: any;
  equipmentsData: any;
  lineIndices: any;
  requestInfo: any;

  loadingData: boolean;
  
  pgInfo: IonicPageModule;
  pgOcur: IonicPageModule;
  pgRepor: IonicPageModule;

  itensPopOver = [
    { name: "Informações", page: ProductionLineDetailsPage },
    { name: "Ocorrências", page: ProductionLineOcurrencyPage },
    { name: "Relatório", page: ProductionLineReportPage}
  ]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public popoverCtrl: PopoverController, 
    public prodServices: ProductionLineServiceProvider,
    public msgService: AlertMessagesProvider
  ) {
    // Code to get the current Year+Month+Day
    let date = new Date();
    let today = date.getFullYear()+"-"+("0" + ( date.getMonth() + 1 ) ).slice(-2)+"-"+date.getDate();
    
    this.requestInfo = { startDate: today+" 00:00:00", endDate: today+" 23:59:59" };
    this.prodline = this.navParams.get("data");
    // this.requestInfo = { startDate: "2018-06-20 00:00:00", endDate: "2018-06-20 23:59:59"};
  }

  ionViewDidLoad() {
    this.loadingData = true;

    // Method to get the index data of productino line
    this.prodServices.getIndices(this.prodline.id).subscribe(
      (response) => {
        this.lineIndices = response.data;
      },
      (response) => {
        console.log(response);
        this.msgService.presentAlert("Atenção!","Ocorreu um problema ao requisitar as informações de indices no servidos, por favor tente novamente dentro de alguns instantes.");
      }
    )
    
    // Metodo que pega todos os equipamentos da linha de produção.
    this.prodServices.getEquipments(this.prodline.id).subscribe( 
      (response) => {
        this.prodline.equipments = response;
        this.loadingData = false;
      },
      (response) => {
        console.log(response);
        this.msgService.presentAlert("Atenção!","Ocorreu um problema ao requisitar as informações de equipamentos no servidos, por favor tente novamente dentro de alguns instantes.");
      }
    );
  }

  openPopover(ev){

    let popover = this.popoverCtrl.create(PopoverWidgetComponent, {itens: this.itensPopOver} );

    popover.present({
      ev: ev
    });

    popover.onDidDismiss((item) => {
      if(item){
        this.navCtrl.push(item.page, {data: this.prodline});
      }
    })

  }
}
