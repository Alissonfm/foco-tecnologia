import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductionLineServiceProvider } from '../../providers/production-line-service/production-line-service';
import { AlertMessagesProvider } from '../../providers/alert-messages/alert-messages';

declare var $: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  productionLines: any;
  loadingData: boolean;

  constructor(public messageCtrl: AlertMessagesProvider, public navCtrl: NavController, public prodLineService: ProductionLineServiceProvider) {}

  ionViewDidLoad(){
    this.loadingData = true;
    this.prodLineService.getData({}).subscribe(
      (response)=>{
        this.productionLines = response.data;
        this.loadingData = false;
      },

      (response)=>{
        this.messageCtrl.presentAlert("Erro","Houve um problema ao requisitar as informações, tente fechar e abrir o aplicativo.");
        console.log(response);
      }
    )

  }

}
