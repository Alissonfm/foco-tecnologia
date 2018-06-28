import { NgModule } from '@angular/core';
import { ProductionLineWidgetComponent } from './production-line-widget/production-line-widget';
import { PopoverWidgetComponent } from './popover-widget/popover-widget';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { GraphWidgetComponent } from './graph-widget/graph-widget';
import { LoaderItemComponent } from './loader-item/loader-item';
import { EquipmentInfoComponent } from './equipment-info/equipment-info';
import { RealTimeDataComponent } from './real-time-data/real-time-data';
import { NewGraphComponent } from './new-graph/new-graph';

@NgModule({
	declarations: [
		ProductionLineWidgetComponent,
		PopoverWidgetComponent,
		GraphWidgetComponent,
		GraphWidgetComponent,
		LoaderItemComponent,
    	EquipmentInfoComponent,
    RealTimeDataComponent,
    NewGraphComponent
	],
	imports: [
		CommonModule,
		IonicModule
	],
	exports: [
		ProductionLineWidgetComponent,
		PopoverWidgetComponent,
		GraphWidgetComponent,
		GraphWidgetComponent,
		LoaderItemComponent,
    	EquipmentInfoComponent,
    RealTimeDataComponent,
    NewGraphComponent
	]
})
export class ComponentsModule {}
