import { Component, Input, OnChanges } from '@angular/core';
import { EquipmentServiceProvider } from '../../providers/equipment-service/equipment-service';
import { ProductionLineServiceProvider } from '../../providers/production-line-service/production-line-service';
import { DatasetsItem } from '../../models/DatasetsItem.models';
import { RealTimePage } from '../../pages/real-time/real-time';
import { NavController } from 'ionic-angular';
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
export class GraphWidgetComponent implements OnChanges {

  @Input() equipmentData: any;
  @Input() timeData: { startDate: string, endDate: string };

  idChart: string;
  chart: any;
  datasetsChar = [];
  colorsChart = ['rgba(254, 65, 5, 1)', 'rgba(255, 171, 22, 1)', 'rgba(152, 154, 4, 1)', 'rgba(0, 108, 92, 1)','rgba(255, 171, 22, 1)'];
  loadingData: boolean;

  fullData: any;
  visibility: boolean;

  visibleIndex: any;

  constructor(
    public equipmentServices: EquipmentServiceProvider, 
    public lineServices: ProductionLineServiceProvider, 
    public navCtrl: NavController
  ){
    this.visibility = false;
  }

  ngOnChanges(x){
    if(this.equipmentData.id) {
      this.idChart = "chart"+this.equipmentData.id;
    }
  }

  switchVisibility(option) {
    this.visibility = option;
  }

  loadReports(){

    this.loadingData = true;
    this.equipmentServices.getAllSensorRegister(this.equipmentData.id, this.timeData).subscribe( (response)=>{
      
      this.loadingData = false;
      this.fullData = response;

      this.visibleIndex = 0;
      
      let tamanhoGrafico = "100%";
      if(response.sensors[0].registers.length > 0){
        if(response.sensors[0].registers.length > 10) {
          tamanhoGrafico =  (response.sensors[0].registers.length * 55) +"px";
        }
      }

      $("#"+this.idChart).parent(".grafico").css('width',tamanhoGrafico);

      this.setDataChart();

      setTimeout(() => {        
        $('.legend-graph .legend-item:eq(0)').attr("style",'background:'+this.colorsChart[0]+' !important')
        $('.legend-graph .legend-item:eq(1)').attr("style",'background:'+this.colorsChart[1]+' !important')
        $('.legend-graph .legend-item:eq(2)').attr("style",'background:'+this.colorsChart[2]+' !important')
        $('.legend-graph .legend-item:eq(3)').attr("style",'background:'+this.colorsChart[3]+' !important')
        $('.legend-graph .legend-item:eq(4)').attr("style",'background:'+this.colorsChart[4]+' !important')
      }, 500);

    })

  }

  initCharts(){
    
    this.chart = undefined;  
    const $this = this;

    let ctx = $("#"+this.idChart);
    
    let novoChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: [],
          datasets: $this.datasetsChar
      },
      options: {
        legend: {
          display: false
        },
        responsive: true, 
        maintainAspectRatio: false,
        animation:{
          onComplete: function(){
            // var sourceCanvas = this.chart.ctx.canvas;
            // var copyWidth = this.scale.xScalePaddingLeft - 5;
            // // the +5 is so that the bottommost y axis label is not clipped off
            // // we could factor this in using measureText if we wanted to be generic
            // var copyHeight = this.scale.endPoint + 5;
            // var targetCtx = $("#"+this.idChart+"Axis").getContext("2d");
            // targetCtx.canvas.width = copyWidth;
            // targetCtx.drawImage(sourceCanvas, 0, 0, copyWidth, copyHeight, 0, 0, copyWidth, copyHeight);
          }
        },
        scales: {
          xAxes: [{
            display: true,
          }],
          yAxes: [{
            display: true
          }]
        }
      }
      
    });

    this.chart = novoChart;
  }

  showRealTime(id){
    this.navCtrl.push(RealTimePage, {data: id});
  }

  setDataChart(){
    // this.sensorService.getRegisters(id).subscribe( (response) => {     
      if(this.chart){

        this.chart.destroy();
        this.datasetsChar = [];
        
      }
      
      this.initCharts();
      // this.sensor.registers = response;
      
      const $this = this;

      this.fullData.sensors.forEach( (element, indexSensor) => {
        
        const data = [];
        // console.log(element);
        element.registers.forEach(elementRegister => {
          
          if(indexSensor == 0)
            $this.chart.data.labels.push(elementRegister.created_at.split(" ")[1])

          // if(indexSensor)

          data.push(elementRegister.quantity)
          
        });

        // console.log(element)
        const dataSetEquipment = new DatasetsItem(
          false,
          false,
          element.name,
          $this.colorsChart[indexSensor],
          'rgba(255, 99, 132, 0.1)',
          data     
        )
        {
          
        }
        this.datasetsChar.push(dataSetEquipment);
      });
      // console.log(this.currentSensor);
      this.chart.update();
    // })
  }

  setHiddenDataset(ref, botao) {

    this.visibleIndex = ref

    this.datasetsChar[0].hidden = true;
    this.datasetsChar[1].hidden = true;
    this.datasetsChar[2].hidden = true;
    this.datasetsChar[3].hidden = true;
    this.datasetsChar[4].hidden = true;

    if (ref == 0) {
      this.datasetsChar[0].hidden = false;
      this.datasetsChar[1].hidden = false;
      this.datasetsChar[2].hidden = false;
      this.datasetsChar[3].hidden = false;
      this.datasetsChar[4].hidden = false;
    }

    if (ref == 1) {
      this.datasetsChar[(ref - 1)].hidden = false;
    }

    if (ref == 2) {
      this.datasetsChar[(ref - 1)].hidden = false;
    }

    if (ref == 3) {
      this.datasetsChar[(ref - 1)].hidden = false;
    }

    if (ref == 4) {
      this.datasetsChar[(ref - 1)].hidden = false;
    }

    if (ref == 5) {
      this.datasetsChar[(ref - 1)].hidden = false;
    }

    this.chart.update();

  }

}
