import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

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
import { LoaderItemComponent } from '../components/loader-item/loader-item';
import { AppConfigServiceProvider } from '../providers/app-config-service/app-config-service';
import { ProductionLineConfigServiceProvider } from '../providers/production-line-config-service/production-line-config-service';
import { AlertMessagesProvider } from '../providers/alert-messages/alert-messages';
import { EquipmentInfoComponent } from '../components/equipment-info/equipment-info';
import { RealTimeDataComponent } from '../components/real-time-data/real-time-data';
import { RealTimePage } from '../pages/real-time/real-time';
import { OcurrencyServiceProvider } from '../providers/ocurrency-service/ocurrency-service';
import { NewGraphComponent } from '../components/new-graph/new-graph';

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
    RealTimePage
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
    LoaderItemComponent,
    LoaderPage,
    NewGraphComponent,
    RealTimeDataComponent,
    PopoverWidgetComponent,
    GraphWidgetComponent,
    EquipmentInfoComponent,
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
    RealTimePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpClient,
    ConfigProviders,
    CrudServiceProvider,
    ProductionLineServiceProvider,
    EquipmentServiceProvider,
    AppConfigServiceProvider,
    ProductionLineConfigServiceProvider,
    AlertMessagesProvider,
    OcurrencyServiceProvider
  ]
})
export class AppModule {}
