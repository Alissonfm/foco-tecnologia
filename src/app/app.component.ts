import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoaderPage } from '../pages/loader/loader';
import { ProductionLineListPage } from '../pages/production-line-list/production-line-list';
import { InformacaoPage } from '../pages/informacao/informacao';
import { ConfiguracaoPage } from '../pages/configuracao/configuracao';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoaderPage;

  pages: Array<{title: string, component: any, icon: string, type: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: "home", type: "new" },
      { title: 'Linhas de Produção', component: ProductionLineListPage, icon: "list-box", type: "new" },
      { title: 'Configurações', component: ConfiguracaoPage, icon: "cog", type: "push"},
      { title: 'Informações', component: InformacaoPage, icon: "information-circle", type: "push"}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.type == "new"){
      this.nav.setRoot(page.component);
    } else {
      this.nav.push(page.component);
    }
  }
}
