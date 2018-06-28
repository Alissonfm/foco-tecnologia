import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EquipmentServiceProvider } from '../../providers/equipment-service/equipment-service';

/**
 * Generated class for the RealTimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-real-time',
  templateUrl: 'real-time.html',
})
export class RealTimePage {

  equipmentId: any;
  equipmentData: any;

  loadingData: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public equipmentService: EquipmentServiceProvider) {
    this.equipmentId = navParams.get("data");
  }

  ionViewDidLoad() {
    this.getEquipment(this.equipmentId);
  }

  // Get the equipment the equipment data of who it will work
  getEquipment(id){
    
    this.loadingData = true;
    this.equipmentService.get(id).subscribe((response) => {
      this.equipmentData = response;
      this.loadingData = false;
    })
  }

  
  

}
