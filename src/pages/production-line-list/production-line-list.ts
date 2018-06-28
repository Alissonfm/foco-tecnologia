import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ProductionLineServiceProvider } from '../../providers/production-line-service/production-line-service';
import { ProductionLinePage } from '../production-line/production-line';

/**
 * Generated class for the ProductionLineListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var $: any;

@IonicPage()
@Component({
  selector: 'page-production-line-list',
  templateUrl: 'production-line-list.html',
})
export class ProductionLineListPage {

  items: any;
  loadingData: boolean;

  constructor( 
    public prodLineCtrl: ProductionLineServiceProvider, 
    public navCtrl: NavController 
  ) {}
  
  ionViewDidLoad() {
    this.initializeItems(); 
  }


  initializeItems() {

    this.loadingData = true;
    // passa um objeto vazia pois assim irá assumir as configurações do servidor;
    // Adiciona um subscribe para ouvir a resposta através de um callback;
    this.prodLineCtrl.getData({}).subscribe( (response) => {
      this.items = response.data;
      this.loadingData = false;
    } );
  }

  openPage(item){
    this.navCtrl.setRoot(ProductionLinePage, {data: item});
  }

  getItems(ev) {

    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

  }

}
