import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RealTimePage } from './real-time';

@NgModule({
  declarations: [
    RealTimePage,
  ],
  imports: [
    IonicPageModule.forChild(RealTimePage),
  ],
})
export class RealTimePageModule {}
