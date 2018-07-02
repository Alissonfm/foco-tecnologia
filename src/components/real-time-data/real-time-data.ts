// import { DatasetsItem } from '../../models/DatasetsItem.models';
// import { ProductionLinePage } from '../../pages/production-line/production-line';
import { Component, Input, OnChanges } from '@angular/core';
import { ConfigProviders } from '../../providers/config-providers';
import { EquipmentServiceProvider } from '../../providers/equipment-service/equipment-service';
import * as io from 'socket.io-client';
import { AlertMessagesProvider } from '../../providers/alert-messages/alert-messages';
import { NavController } from 'ionic-angular';
import { CtSettingServiceProvider } from '../../providers/ct-setting-service/ct-setting-service';
import { SensorServiceProvider } from '../../providers/sensor-service/sensor-service';

/**
 * Generated class for the RealTimeDataComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

declare var $: any
// declare var Chart: any
// declare var moment: any
// declare var bootbox: any
declare var Highcharts: any

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
  //new
  carregando: boolean;
  settings: boolean;

  hidden: any;
  chart: any;
  datasetsChar: any;
  socket: any;
  data: any;
  //new
  seriesOptions:any;
  seriesCounter:any;

  visibleIndex: any;
  fullData: any;
  tamanhoGrafico: any;
  // timeData: any;
  // today: any;

  idChart: string;

  // colorsChart = ['rgba(254, 65, 5, 1)', 'rgba(255, 171, 22, 1)', 'rgba(152, 154, 4, 1)', 'rgba(0, 108, 92, 1)','rgba(255, 171, 22, 1)'];

  colors = [{
    color: 'rgba(96, 189, 175, 0.2)',
  }, {
    color: 'rgba(161, 216, 177, 0.2)',
  }, {
    color: 'rgba(237, 252, 194, 0.2)',
  }, {
    color: 'rgba(248, 138, 175, 0.2)',
  }, {
    color: 'rgba(69, 86, 85, 0.2)',
  }]

  equipment_id: number

  // enviar o ID do equipamento como parâmetro externo, input,  para este componente
  constructor(
    private equipmentService: EquipmentServiceProvider, 
    public msgCtrl: AlertMessagesProvider,
    public navCtrl: NavController,
    public settingServices: CtSettingServiceProvider,
    public sensorService: SensorServiceProvider
  ) {
    this.socket = io.connect( ConfigProviders.SOCKET_URL );

    // let date = new Date();
    // this.today = date.getFullYear()+"-"+(("0" + ( date.getMonth() + 1 ) ).slice(-2))+"-"+(("0"+date.getDate()).slice(-2));
    // this.timeData = { startDate: this.today+" 00:00:00", endDate: this.today+" 23:59:59" };

    this.canStart = false;
    this.openReports = false;
    this.loadingData = true;
  }
    
  // This funcion will check if the component received the equipment id to start the process.
  ngOnChanges(x){
    if(this.equipment){
      this.idChart = "chart"+this.equipment.id;
      this.canStart = true;
      this.getSensor(this.getTime("date-request"));
      // this.getEquipment(id);
      // this.initHighChart();
    }
  }

  getTime(type: string){
    let date = new Date();
    let dateNowString = date.getFullYear()+"-"+("0" + ( date.getMonth() + 1 ) ).slice(-2)+"-"+("0" + date.getDate() ).slice(-2);
    if(type == "date") {
      return dateNowString;
    } else if(type == "date-time") {
      return dateNowString+" "+date.getHours()+":"+date.getMinutes()+":"+( "0" + date.getSeconds() ).slice(-2);
    } else if(type == "date-request") {
      return {startDate: dateNowString+" 00:00:00", endDate: dateNowString+" 23:59:59"};
    }
  }
  
  switchVisibility(option) {
    this.visibility = option;
  }

  getByGroup(group) {
    this.carregando = true;
    this.settingServices.getByGroup({name: group}).subscribe((res) => { 
      this.carregando = false;  
      this.settings = res;
      this.getEquipment(this.equipment.id);
    });
  }

  initConnectionNode(){

    if(this.socket){
      this.socket.disconnect();
      this.socket = undefined;
    }

    this.socket = io.connect(ConfigProviders.SOCKET_URL,{
      reconnection: false
    });

    let $this = this;

    this.socket.on('connect_error', function(){

      this.msgCtrl.presentAlert(
        "Atenção!",
        "Servidor para serviço em tempo real desconectou. Deseja tentar reconectar?",
      )

      /*
      bootbox.alert({
        title: "Atenção!",
        message: 'Servidor para serviço em tempo real indispónivel',
        callback: function(){
        }
      });
      */

    });

    this.socket.on('connect', function(socket) {  
    
        if($this.equipment){
          let data = {
            particle_id: $this.equipment.particle_id
          }     
          $this.socket.emit("disconectCount", data);
          $this.socket.off("count" + $this.equipment.particle_id);
        }        
      
      $this.getByGroup('particle');

    });

    this.socket.on('disconnect', (exSocket) => {
      console.log(exSocket);
    });
  }

  addData(data) {

    this.datasetsChar[0].data.push(data[0]);
    this.datasetsChar[1].data.push(data[1]);
    this.datasetsChar[2].data.push(data[2]);
    this.datasetsChar[3].data.push(data[3]);
    this.datasetsChar[4].data.push(data[4]);
    
    let dataString = new Date();
    this.chart.data.labels.push( this.getTime("date-resquest") );
    this.chart.data.datasets = this.datasetsChar;
    this.chart.update();
    this.updateWidthGraph();
  }

  setInitialWidthGraph(){
    let tamanhoGrafico = "100%";
    if(this.equipment.sensors[0].registers.length>0){
      tamanhoGrafico = (this.equipment.sensors[0].registers.length * 55) + "px";
    }
    $("#myChart").parent('.chart').css("width",tamanhoGrafico)
  }

  updateWidthGraph(){
    let tamanhoGrafico = "100%";
    if($("#content tr").length > 0){
      tamanhoGrafico = ($("#content tr").length * 55) + "px";
    }
    if(parseInt($("#myChart").parent('.chart').css("width")) <  parseInt(tamanhoGrafico)){
      $("#myChart").parent('.chart').css("width",tamanhoGrafico)
    }

  }

  getEquipment(id){
    let $this = this;
    this.equipmentService.get(id).subscribe((response) => {
      this.equipment = response;
      var datasend = $this.getTime("date-request");
      this.getSensor(datasend);
   })
  }

  getSensor(datasend){
    
    let $this = this;

    this.equipmentService.getAllSensorRegister(this.equipment.id, datasend).subscribe( (response) => {

      // console.log(response);

      this.equipment.sensors = response.sensors;

      setTimeout(() => {        
        $('.legend-graph .legend-item:eq(0)').attr("style",'background:'+this.colors[0].color+' !important')
        $('.legend-graph .legend-item:eq(1)').attr("style",'background:'+this.colors[1].color+' !important')
        $('.legend-graph .legend-item:eq(2)').attr("style",'background:'+this.colors[2].color+' !important')
        $('.legend-graph .legend-item:eq(3)').attr("style",'background:'+this.colors[3].color+' !important')
        $('.legend-graph .legend-item:eq(4)').attr("style",'background:'+this.colors[4].color+' !important')
      }, 500);


      /*
      this.sensorService.getIntervalRegisters(this.equipment.id, datasend).subscribe(
        (response) => {
          console.log(response);
          this.equipment.sensors.registers = response;
        },
        (response) => {
          console.log(response);
        }
      );
      */

      this.initHighChart();
    })
  }

  initHighChart(){
    this.loadingData = false;

    this.seriesOptions = []
    let $this = this;

    // console.log(this.equipment.sensors);
    
    this.equipment.sensors.forEach( (element, indexSensor) => {
      const data = [];

      element.registers.forEach(elementRegister => {

        data.push([
          new Date(elementRegister.created_at).getTime(),
          elementRegister.quantity,          
        ]);        

      });    

      $this.seriesOptions[indexSensor] = {
        name: element.name,
        data: data
      };

      console.log($this.seriesOptions);

    });
    
    $this.createHighChart();

  }

  createHighChart() {

    if(this.chart){
      this.chart.destroy();
    }

    let $this = this;
    this.chart = undefined;

    this.chart = Highcharts.stockChart({
        chart:{
          zoomType: "xy",
          renderTo: "myChart",
          events: {
            load: function () {

              // console.log('readChart')

              let data = {
                particle_id: $this.equipment.particle_id
              }

              $this.socket.emit("initCount", data);

              let thisChart = this; 

              let series0 = this.series[0];
              let series1 = this.series[1];
              let series2 = this.series[2];
              let series3 = this.series[3];
              let series4 = this.series[4];

              let x = (new Date()).getTime();
              
              $this.socket.on("count"+$this.equipment.particle_id, function(response) {

                let counts = response.data.split('.');

                let newInsert = (new Date()).getTime();
                
                if(newInsert - x > 5000 ){
                  
                  x = newInsert;
                
                  series0.addPoint([x, parseInt(counts[0])], true, true);
                  series1.addPoint([x, parseInt(counts[1])], true, true);
                  series2.addPoint([x, parseInt(counts[2])], true, true);
                  series3.addPoint([x, parseInt(counts[3])], true, true);
                  series4.addPoint([x, parseInt(counts[4])], true, true);

                  var date = $('<td>').text(this.today+"");
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
                }
                
              })            
            }
          
          },
          rangeSelector: {
              selected: 4
          },
          yAxis: {    
              labels: {
                  formatter: function () {
                    return (this.value > 0 ? ' + ' : '') + this.value ;
                  }
              }
          },
          tooltip: {
              pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
              valueDecimals: 2,
              split: true
          },
          series: $this.seriesOptions
        }
    })

    this.initConnectionNode();
    }

  setHiddenDataset(ref) {

    this.visibleIndex = ref;

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

  /**
   * Codigo antigo do real time com o Chart.Js
   */

  // This funcion will start the process of real-time when it receives the equipmentID
  /*
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
  }
  */

  /*
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
  */

  /*
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
  */

// Get the equipment the equipment data of who it will work
/*
  getEquipment(id){
    this.equipmentService.get(id).subscribe((response) => {
      this.equipment = response;
      this.getSensor(this.timeData);
    })
  }
*/

// DESCOMENTAR QUANDO FOR IMPLEMENTAR
/*
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
*/
   
  /*
  setDataChart(){
    if(this.chart){
      this.chart.destroy();
      this.datasetsChar = [];
    }
    this.initChart();
    const $this = this;
    this.equipment.sensors.forEach( (element, indexSensor) => {
      const data = [];
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
  }
  */
 
  /*
  initChart(){
    this.chart = null;
    const $this = this;
    let ctx = $("#"+this.idChart);
    let chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: [],
          datasets: $this.datasetsChar
      },
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
  */
}