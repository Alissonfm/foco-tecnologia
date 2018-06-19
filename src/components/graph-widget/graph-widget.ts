import { Component, Input, OnInit } from '@angular/core';
import { EquipmentServiceProvider } from '../../providers/equipment-service/equipment-service';
import { ProductionLineServiceProvider } from '../../providers/production-line-service/production-line-service';
// import { NavParams } from 'ionic-angular';

/**
 * Generated class for the GraphWidgetComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

declare var $: any;
declare var Chart: any;

@Component({
  selector: 'graph-widget',
  templateUrl: 'graph-widget.html',
})
export class GraphWidgetComponent implements OnInit {

  @Input() equipmentData: any;
  @Input() timeData: { startDate: string, endDate: string };

  idChart: string;
  fullData: any;
  visibility: boolean;

  constructor(public equipmentServices: EquipmentServiceProvider, public lineServices: ProductionLineServiceProvider) {
    console.log('Hello GraphWidgetComponent Component');
    this.visibility = false;
  }

  ngOnInit() {
    
    console.log(this.timeData);

    /*
    this.lineServices.get(this.equipmentId).subscribe((response)=>{
      console.log(response);
      this.equipmentData = response;
    });

    this.equipmentServices.getAllSensorRegister(this.equipmentId, this.timeData).subscribe( (response)=>{
      console.log(response);
      this.fullData = response;
    })

    this.idChart = "chart"+this.equipmentId+"_"+new Date().getTime();

    setTimeout(() => {
      this.generateChart();      
    }, 500);
    */

  }

  generateChart(){
    let ctx = $("#"+this.idChart);

    let myChart = new Chart(ctx, {

    type: 'line',

    data: {

        labels: ["Red", "Blue", "Yellow", "Green"],

        datasets: [{

          label: '# of Votes',

          data: [12, 19, 3, 5],

          backgroundColor: [
            'rgba(254, 65, 5, 1)',
            'rgba(255, 171, 22, 1)',
            'rgba(152, 154, 4, 1)',
            'rgba(0, 108, 92, 1)',
          ],

          borderColor: [
              'rgba(254, 65, 5, 1)',
              'rgba(255, 171, 22, 1)',
              'rgba(152, 154, 4, 1)',
              'rgba(0, 108, 92, 1)',
          ],

          fill: false,
          
          borderWidth: 1
        }]
      }  
    });
  }


  /*

  datasets: [{
        labels: ["laranja", "Blue", "Yellow", "Green"],
        data: [{
          label: '# of Votes',
          data: [12, 19, 3, 5],
          backgroundColor: ['rgba(254, 65, 5, 1)'],
          borderColor: ['rgba(254, 65, 5, 1)'],
          fill: false,
          borderWidth: 1
        }]
      },
      {
        labels: ["amarelo"],
        data: [{
          label: '# of Votes',
          data: [12, 19, 3, 5],
          backgroundColor: [ 'rgba(255, 171, 22, 1)' ],
          borderColor: ['rgba(255, 171, 22, 1)' ],
          fill: false,
          borderWidth: 1
        }]
      },
      {
        labels: ["verde"],
        data: [{
          label: '# of Votes',
          data: [12, 19, 3, 5],
          backgroundColor: [ 'rgba(152, 154, 4, 1)' ],
          borderColor: [ 'rgba(152, 154, 4, 1)' ],
          fill: false,
          borderWidth: 1
        }]
      },
      {
        labels: ["azul"],
        data: [{
          label: '# of Votes',
          data: [12, 19, 3, 5],
          backgroundColor: ['rgba(0, 108, 92, 1)'],
          borderColor: ['rgba(0, 108, 92, 1)'],
          fill: false,
          borderWidth: 1
        }]
      }]

  */

  switchVisibility(option) {
    this.visibility = option;
  }

  loadReports(){

    this.equipmentServices.getAllSensorRegister(this.equipmentData.id, this.timeData).subscribe( (response)=>{
      console.log(response);
      this.fullData = response;
    })

    this.idChart = "chart"+this.equipmentData.id+"_"+new Date().getTime();

    setTimeout(() => {
      this.generateChart();      
    }, 500);

  }

}
