import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the LoaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loader',
  templateUrl: 'loader.html',
})
export class LoaderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    setTimeout( () => {
      this.navCtrl.setRoot(LoginPage);
    }, 3500 );
  }

}
