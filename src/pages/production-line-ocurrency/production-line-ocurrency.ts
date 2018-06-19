import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductionLineOcurrencyPage');
  }

}
