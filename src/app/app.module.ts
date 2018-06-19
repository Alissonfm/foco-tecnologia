import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoaderPage } from '../pages/loader/loader';
import { LoginPage } from '../pages/login/login';
import { ComponentsModule } from '../components/components.module';
import { ProductionLineWidgetComponent } from '../components/production-line-widget/production-line-widget';
import { ProductionLineListPage } from '../pages/production-line-list/production-line-list';
import { InformacaoPage } from '../pages/informacao/informacao';
import { ConfiguracaoPage } from '../pages/configuracao/configuracao';
import { CrudServiceProvider } from '../providers/crud-service/crud-service';
import { ProductionLineServiceProvider } from '../providers/production-line-service/production-line-service';
import { ConfigProviders } from '../providers/config-providers';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductionLineOcurrencyPage } from '../pages/production-line-ocurrency/production-line-ocurrency';
import { ProductionLineReportPage } from '../pages/production-line-report/production-line-report';
import { ProductionLineDetailsPage } from '../pages/production-line-details/production-line-details';
import { ProductionLinePage } from '../pages/production-line/production-line';
import { PopoverWidgetComponent } from '../components/popover-widget/popover-widget';
import { GraphWidgetComponent } from '../components/graph-widget/graph-widget';
import { EquipmentServiceProvider } from '../providers/equipment-service/equipment-service';

@NgModule({
  declarations: [
    MyApp,
    LoaderPage,
    LoginPage,
    HomePage,
    ProductionLineListPage,
    InformacaoPage,
    ConfiguracaoPage,
    ProductionLinePage,
    ProductionLineDetailsPage,
    ProductionLineOcurrencyPage,
    ProductionLineReportPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
    LoaderPage,
    PopoverWidgetComponent,
    GraphWidgetComponent,
    LoginPage,
    HomePage,
    ProductionLineListPage,
    InformacaoPage,
    ConfiguracaoPage,
    ProductionLinePage,
    ProductionLineWidgetComponent,
    ProductionLineDetailsPage,
    ProductionLineOcurrencyPage,
    ProductionLineReportPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpClient,
    ConfigProviders,
    CrudServiceProvider,
    ProductionLineServiceProvider,
    EquipmentServiceProvider
  ]
})
export class AppModule {}
