import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductionLineReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-production-line-report',
  templateUrl: 'production-line-report.html',
})
export class ProductionLineReportPage {


  time: { startDate: string, startTime: string, endDate: string, endTime: string }; 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
    this.time = { startDate: "2018-06-15", startTime: "12:00", endDate: "2018-06-16", endTime: "17:00" };
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductionLineReportPage');
  }

  loadCustomReport() {
    
  }

}
