import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EquipmentServiceProvider } from '../../providers/equipment-service/equipment-service';
import { ProductionLineServiceProvider } from '../../providers/production-line-service/production-line-service';

/**
 * Generated class for the ProductionLineReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var $: any;
declare var Chart: any;

@IonicPage()
@Component({
  selector: 'page-production-line-report',
  templateUrl: 'production-line-report.html',
})
export class ProductionLineReportPage {

  // time: { startDate: string, startTime: string, endDate: string, endTime: string };
  time: any;
  requestTime: any;
  lineData: any;
  sensorsData: any;

  constructor(
  
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public lineService: ProductionLineServiceProvider 
  
  ) {

    this.lineData = this.navParams.get("data");
    var tempo = new Date();
    let mes = ("0"+(tempo.getMonth()+1)).slice(-2);
    this.time = { 
      startDate: tempo.getFullYear()+"-"+mes+"-"+tempo.getDate(),
      startTime: "08:00",
      endDate: tempo.getFullYear()+"-"+mes+"-"+tempo.getDate(),
      endTime: "17:59"
    }
  }
  
  ionViewDidLoad() {   
    console.log('ionViewDidLoad ProductionLineReportPage');
  }

  loadCustomReport() {
    this.requestTime = {startDate: $("#startDate .datetime-text").text()+" "+$("#startTime .datetime-text").text()+":00", endDate: $("#endDate .datetime-text").text()+" "+$("#endTime .datetime-text").text()+":59"};

    this.lineService.getEquipments(this.lineData.id).subscribe(
      (response)=>{
        this.lineData.equipments = response;
      },
      (response)=>{
        console.log(response);
      }
    );

  }

}
