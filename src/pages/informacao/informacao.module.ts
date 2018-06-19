import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InformacaoPage } from './informacao';

@NgModule({
  declarations: [
    InformacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(InformacaoPage),
  ],
})
export class InformacaoPageModule {}
