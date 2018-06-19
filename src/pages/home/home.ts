import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductionLineServiceProvider } from '../../providers/production-line-service/production-line-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  productionLines: any;

  constructor(public navCtrl: NavController, public prodLineService: ProductionLineServiceProvider) {

  }

  ionViewDidLoad(){
    this.prodLineService.getData({}).subscribe((response)=>{
      this.productionLines = response.data;
      console.log(this.productionLines);
    })
  }

}
