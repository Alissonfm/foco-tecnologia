import { Component, Input, OnChanges } from '@angular/core';
import { DatasetsItem } from '../../models/DatasetsItem.models';
import { ConfigProviders } from '../../providers/config-providers';
import { EquipmentServiceProvider } from '../../providers/equipment-service/equipment-service';
import * as io from 'socket.io-client';
import { AlertMessagesProvider } from '../../providers/alert-messages/alert-messages';


/**
 * Generated class for the RealTimeDataComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

declare var $: any
declare var Chart: any

@Component({
  selector: 'real-time-data',
  templateUrl: 'real-time-data.html'
})

export class RealTimeDataComponent implements OnChanges {

  @Input() equipment: any;

  visibility: boolean;
  loadingData: boolean;
  canStart: boolean;
  openReports: boolean;

  hidden: any;
  chart: any;
  datasetsChar: any;
  colors: any;
  socket: any;
  data: any;
  // equipment: any;
  visibleIndex: any;
  today: any;
  fullData: any;
  timeData: any;
  tamanhoGrafico: any;

  idChart: string;

  colorsChart = ['rgba(254, 65, 5, 1)', 'rgba(255, 171, 22, 1)', 'rgba(152, 154, 4, 1)', 'rgba(0, 108, 92, 1)','rgba(255, 171, 22, 1)'];

  // enviar o ID do equipamento como parâmetro externo, input,  para este componente
  constructor(private equipmentService: EquipmentServiceProvider, public msgCtrl: AlertMessagesProvider) {
    
    this.socket = io.connect( ConfigProviders.SOCKET_URL );

    let date = new Date();
    this.today = date.getFullYear()+"-"+("0" + ( date.getMonth() + 1 ) ).slice(-2)+"-"+date.getDate();
    
    this.timeData = { startDate: this.today+" 00:00:00", endDate: this.today+" 23:59:59" };
    this.canStart = false;
    this.openReports = false;
    this.loadingData = true;
  }
    
  // This funcion will check if the component received the equipment id to start the process.
  ngOnChanges(x){
    
    if(this.equipment){
      this.idChart = "chart"+this.equipment.id;
      this.canStart = true;
      this.startProcess(this.equipment.id);
    }
  }
  
  switchVisibility(option) {
    this.visibility = option;
  }

  // This funcion will start the process of real-time when it receives the equipmentID
  startProcess(id){

    this.visibleIndex = 0;
    if(id){
      this.getSensor(this.timeData);
    }
    this.datasetsChar = [];

    this.colors = [{
      colors: 'rgba(96, 189, 175, 0.2)',
    }, {
      colors: 'rgba(161, 216, 177, 0.2)',
    }, {
      colors: 'rgba(237, 252, 194, 0.2)',
    }, {
      colors: 'rgba(248, 138, 175, 0.2)',
    }, {
      colors: 'rgba(69, 86, 85, 0.2)',
    }]

    // this.initChart();
  }

  addData(data) {

    this.datasetsChar[0].data.push(data[0])
    this.datasetsChar[1].data.push(data[1])
    this.datasetsChar[2].data.push(data[2])
    this.datasetsChar[3].data.push(data[3])
    this.datasetsChar[4].data.push(data[4])
    
    if(this.chart.data.datasets[0].data.length > 10) {

        this.datasetsChar[0].data.pop(0)
        this.datasetsChar[1].data.pop(0)
        this.datasetsChar[2].data.pop(0)
        this.datasetsChar[3].data.pop(0)
        this.datasetsChar[4].data.pop(0)
        this.chart.data.labels.pop(0)
    }

    let dataString = new Date()
    this.chart.data.labels.push(dataString.getHours() + ":" + dataString.getMinutes() + ":" + dataString.getSeconds())
    this.chart.data.datasets = this.datasetsChar;
    this.chart.update();
  }

  initCount(){
    
    const $this = this;
    
    let data = {
      particle_id: this.equipment.particle_id
    }
    
    this.socket.emit("initCount", data);
    this.socket.on("count"+this.equipment.particle_id, function(response) {
      
      var time = new Date();
      var counts = response.data.split('.');

      $this.addData(counts)

      var date = $('<td>').text( $this.today+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds())
      var count1 = $('<td>').text(counts[0]);
      var count2 = $('<td>').text(counts[1]);
      var count3 = $('<td>').text(counts[2]);
      var count4 = $('<td>').text(counts[3]);
      var count5 = $('<td>').text(counts[4]);

      var row = $('<tr>');
      $(row).append(date);
      $(row).append(count1);
      $(row).append(count2);
      $(row).append(count3);
      $(row).append(count4);
      $(row).append(count5);

      $("#content").prepend(row);
      
    })
  }

  setHiddenDataset(ref) {

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

// Get the equipment the equipment data of who it will work
  getEquipment(id){
    
    this.equipmentService.get(id).subscribe((response) => {
      // console.log(response);
      this.equipment = response;
      this.getSensor(this.timeData);

    })
  }

// DESCOMENTAR QUANDO FOR IMPLEMENTAR
  getSensor(datasend){

    this.equipmentService.getAllSensorRegister(this.equipment.id, datasend).subscribe( (response) => {

      this.equipment.sensors = response.sensors;

      let tamanhoGrafico = "100%";
      if(this.equipment.sensors[0].registers.length > 0){
        if(this.equipment.sensors[0].registers.length > 10) {
          tamanhoGrafico =  (this.equipment.sensors[0].registers.length * 55) +"px";
        }
      }
      $("#"+this.idChart).parent(".grafico").css('width',tamanhoGrafico);

      this.setDataChart();
      this.loadingData = false;

    })
  }

  ngOnDestroy(){

    console.log('Dexxxtruído');

    let data = {
      particle_id: this.equipment.particle_id
    }

    this.socket.emit("disconectCount", data)
    this.socket.off("count" + this.equipment.particle_id);
  }
  

  setDataChart(){
    
      if(this.chart){
        this.chart.destroy();
        this.datasetsChar = [];
      }

      this.initChart();
      
      const $this = this;
      
      this.equipment.sensors.forEach( (element, indexSensor) => {
        const data = [];
        // console.log(element);

        element.registers.forEach(elementRegister => {
          
          if(indexSensor == 0)
            $this.chart.data.labels.push(elementRegister.created_at)

          data.push(elementRegister.quantity)
          
        });

        const dataSetEquipment = new DatasetsItem (
          true,
          false,
          element.name,
          $this.colors[indexSensor].colors,
          $this.colors[indexSensor].colors,
          data     
        )

        this.datasetsChar.push(dataSetEquipment);
      });

      this.chart.update();
      this.initCount();
      /*
      setTimeout(() => {        
        $('.legend-graph .legend-item:eq(0)').attr("style",'background:'+this.colorsChart[0]+' !important')
        $('.legend-graph .legend-item:eq(1)').attr("style",'background:'+this.colorsChart[1]+' !important')
        $('.legend-graph .legend-item:eq(2)').attr("style",'background:'+this.colorsChart[2]+' !important')
        $('.legend-graph .legend-item:eq(3)').attr("style",'background:'+this.colorsChart[3]+' !important')
        $('.legend-graph .legend-item:eq(4)').attr("style",'background:'+this.colorsChart[4]+' !important')
      }, 500);
      */
  }
 
  initChart(){

    this.chart = null;
    const $this = this;
    
    let ctx = $("#"+this.idChart);

    let chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
        data: {
            labels: [],
            datasets: $this.datasetsChar
        },
        // Configuration options go here
        options: {
            scales: {
                xAxes: [{
                    display: true,
                }],
                yAxes: [{
                    display: true,
                    type: 'linear'
                }]
            }
        }
    });

    this.chart = chart;

    setTimeout(() => {        
      $('.legend-graph .legend-item:eq(0)').attr("style",'background:'+this.colorsChart[0]+' !important')
      $('.legend-graph .legend-item:eq(1)').attr("style",'background:'+this.colorsChart[1]+' !important')
      $('.legend-graph .legend-item:eq(2)').attr("style",'background:'+this.colorsChart[2]+' !important')
      $('.legend-graph .legend-item:eq(3)').attr("style",'background:'+this.colorsChart[3]+' !important')
      $('.legend-graph .legend-item:eq(4)').attr("style",'background:'+this.colorsChart[4]+' !important')
    }, 500);

  }
}