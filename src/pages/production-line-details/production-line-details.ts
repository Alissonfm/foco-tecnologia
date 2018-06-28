import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertMessagesProvider } from '../../providers/alert-messages/alert-messages';
import { EquipmentServiceProvider } from '../../providers/equipment-service/equipment-service';
import { ProductionLineServiceProvider } from '../../providers/production-line-service/production-line-service';

/**
 * Generated class for the ProductionLineDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-production-line-details',
  templateUrl: 'production-line-details.html',
})
export class ProductionLineDetailsPage {

  lineData: any;
  equipmentInfo: any;
  loadingData: boolean;


  constructor(public messageCtrl: AlertMessagesProvider, public navCtrl: NavController, public navParams: NavParams, public lineService: ProductionLineServiceProvider) {
    this.lineData = navParams.get("data");
  }

  ionViewDidLoad() {
    this.getEquipments(this.lineData.id);
  }

  getEquipments(id: number) {
    this.loadingData = true;
    this.lineService.getEquipments(id).subscribe(
      (response)=>{
        this.loadingData = false;
        this.equipmentInfo = response;
      },
      (response)=>{
        this.lineData = false;
        console.log(response); 
      }
    )
  }

}
