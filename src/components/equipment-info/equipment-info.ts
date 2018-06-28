import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { EquipmentServiceProvider } from '../../providers/equipment-service/equipment-service';
import { AlertMessagesProvider } from '../../providers/alert-messages/alert-messages';

/**
 * Generated class for the EquipmentInfoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'equipment-info',
  templateUrl: 'equipment-info.html'
})
export class EquipmentInfoComponent implements OnChanges {
  
  @Input() equipmentInfo: any;
  sensorsInfo: any;
  loadingData: boolean;
  
  constructor(public messageCtrl: AlertMessagesProvider, public equipmentCtrl: EquipmentServiceProvider) {
  }
  
  ngOnChanges(x) {
    if(this.equipmentInfo) {
      this.getSensors(this.equipmentInfo.id);
    }
  }
  
  getSensors(equipmentId: number) {

    this.loadingData = true;

    this.equipmentCtrl.getSensorsOnly(equipmentId).subscribe(
      
      // Callback if success
      (response)=>{
        this.loadingData = false;
        this.sensorsInfo = response;
        // console.log(this.sensorsInfo);
      },

      // Callback if error
      (response)=>{
        this.loadingData = false;
        // console.log(response);
      }
    );
  }

}
