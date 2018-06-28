import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the AlertMessagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertMessagesProvider {

  constructor(public http: HttpClient, private alertCtrl: AlertController) {
    console.log('Hello AlertMessagesProvider Provider');
  }

  presentAlert(titulo, conteudo: string) {

    let alert = this.alertCtrl.create({

      title: titulo,
      subTitle: conteudo,
      buttons: ['Fechar']

    });

    alert.present();

  }
  
  presentConfirm(titulo, conteudo: string) {

    let alert = this.alertCtrl.create({

      title: titulo,

      message: conteudo,

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            return false;
          }
        },

        {
          text: 'Ok',
          handler: () => {
            console.log('Buy clicked');
            return true;
          }
        }

      ]
    });

    alert.present();

  }

}
