import { NgModule } from '@angular/core';
import { ProductionLineWidgetComponent } from './production-line-widget/production-line-widget';
import { PopoverWidgetComponent } from './popover-widget/popover-widget';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { GraphWidgetComponent } from './graph-widget/graph-widget';

@NgModule({
	declarations: [
		ProductionLineWidgetComponent,
		PopoverWidgetComponent,
		GraphWidgetComponent,
    GraphWidgetComponent
	],
	imports: [
		CommonModule,
		IonicModule
	],
	exports: [
		ProductionLineWidgetComponent,
		PopoverWidgetComponent,
		GraphWidgetComponent,
    GraphWidgetComponent
	]
	 
})
export class ComponentsModule {}
