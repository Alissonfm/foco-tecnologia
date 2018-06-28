import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OcurrencyServiceProvider } from '../../providers/ocurrency-service/ocurrency-service';
import { dateDataSortValue } from 'ionic-angular/umd/util/datetime-util';
import { AlertMessagesProvider } from '../../providers/alert-messages/alert-messages';

/**
 * Generated class for the ProductionLineOcurrencyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var $: any;
declare var Chart: any;

@IonicPage()
@Component({
  selector: 'page-production-line-ocurrency',
  templateUrl: 'production-line-ocurrency.html',
})
export class ProductionLineOcurrencyPage {

  date = new Date();
  
  loadingData: boolean;

  time: any;
  lineData: any;
  OcurrencyData: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ocurrencyCtrl: OcurrencyServiceProvider,
    public msgCtrl: AlertMessagesProvider
  ) {

    this.lineData = navParams.get("data");

    this.time = { 
      production_line_id: this.lineData.id,
      start_date: this.date.getFullYear()+"-"+this.getCustomMonth()+"-"+this.date.getDate()+" 00:00:00",
      end_date: this.date.getFullYear()+"-"+this.getCustomMonth()+"-"+this.date.getDate()+" 23:59:59"
    }

  }

  ionViewDidLoad() {
    this.getOcurrencyList();
  }

  getCustomMonth(){
    return ("0"+(this.date.getMonth()+1)).slice(-2);
  }

  getOcurrencyList(){
    this.loadingData = true;
    this.ocurrencyCtrl.getOcurrencyList(this.time).subscribe(

      (response) => {
        this.OcurrencyData = response;
        this.loadingData = false;
      },

      (response) => {
        console.log(response);
        this.msgCtrl.presentAlert("Erro","Houve um erro ao buscar as informações no servidor, por favor tente novamente em alguns instantes");
        this.loadingData = false;
      }

    )
  }

}
