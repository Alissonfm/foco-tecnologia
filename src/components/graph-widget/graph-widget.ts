import { Component, Input, OnChanges } from '@angular/core';
import { EquipmentServiceProvider } from '../../providers/equipment-service/equipment-service';
import { ProductionLineServiceProvider } from '../../providers/production-line-service/production-line-service';
import { RealTimePage } from '../../pages/real-time/real-time';
import { NavController } from 'ionic-angular';
// import { DatasetsItem } from '../../models/DatasetsItem.models';
// import { NavParams } from 'ionic-angular';

/**
 * Generated class for the GraphWidgetComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

declare var $: any;
declare var Highcharts: any;

@Component({
  selector: 'graph-widget',
  templateUrl: 'graph-widget.html',
})
export class GraphWidgetComponent implements OnChanges {

  @Input() equipmentData: any;
  @Input() timeData: { startDate: string, endDate: string };

  idChart: string;
  chart: any;
  seriesOptions: any;
  datasetsChar = [];
  
  colorsChart = [
    'rgba(254, 65, 5, 1)', 
    'rgba(255, 171, 22, 1)', 
    'rgba(152, 154, 4, 1)', 
    'rgba(0, 108, 92, 1)',
    'rgba(255, 171, 22, 1)'
  ];

  loadingData: boolean;

  fullData: boolean = false;
  visibility: boolean;

  graphData: any;

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
    this.equipmentServices.getAllSensorRegister(this.equipmentData.id, this.timeData).subscribe( 
      (response)=>{
      
        this.graphData = response.sensors;
        console.log(response.sensors);
        this.visibleIndex = 0;
        
        let tamanhoGrafico = "100%";
        if(response.sensors[0].registers.length > 0){
          if(response.sensors[0].registers.length > 10) {
            tamanhoGrafico =  (response.sensors[0].registers.length * 55) +"px";
          }
        }

        $("#"+this.idChart).parent(".grafico").css('width',tamanhoGrafico);

        // this.setDataChart();
        
        setTimeout(() => {        
          $('.legend-graph .legend-item:eq(0)').attr("style",'background:'+this.colorsChart[0]+' !important')
          $('.legend-graph .legend-item:eq(1)').attr("style",'background:'+this.colorsChart[1]+' !important')
          $('.legend-graph .legend-item:eq(2)').attr("style",'background:'+this.colorsChart[2]+' !important')
          $('.legend-graph .legend-item:eq(3)').attr("style",'background:'+this.colorsChart[3]+' !important')
          $('.legend-graph .legend-item:eq(4)').attr("style",'background:'+this.colorsChart[4]+' !important')
        }, 500);

        // this.createNewGraph(this.graphData);
        
        this.initHighChart();

        this.fullData = true; 
      }

    );  

  }

  showRealTime(id){
    this.navCtrl.push(RealTimePage, {data: id});
  }

initHighChart(){
    this.loadingData = false;

    this.seriesOptions = []
    let $this = this;

    // console.log(this.equipment.sensors);
    
    this.equipmentData.forEach( (element, indexSensor) => {
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
          /*
          events: {
            load: function () {

              // console.log('readChart')

              let data = {
                particle_id: $this.equipmentData.particle_id
              }

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
          
          },*/
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
  
  }

  createNewGraph(graphData){

    new Highcharts.stockChart({
      chart: {
          renderTo: "myChart",
          zoomType: 'x',
          backgroundColor: "rgba(255,255,255,0)"
      },
    
      navigator: {
          adaptToUpdatedData: false,
          series: {
              data: graphData
          }
      },
    
      scrollbar: {
          liveRedraw: false
      },
      
      rangeSelector: {
        buttons: [{
            type: 'hour',
            count: 1,
            text: '1h'
        }, {
            type: 'day',
            count: 1,
            text: '1d'
        }, {
            type: 'month',
            count: 1,
            text: '1m'
        }, {
            type: 'year',
            count: 1,
            text: '1y'
        }, {
            type: 'all',
            text: 'All'
        }],
        inputEnabled: false,
        selected: 4
      },
  
    xAxis: {
        minRange: 3600 * 1000
    },

    yAxis: {
        floor: 0
    },

    series: [{
        data: graphData,
        dataGrouping: {
            enabled: true
        }
      }]
    });

    this.loadingData = false;
  }

  /*
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
  */

  /*
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

  setDataChart(){   
      if(this.chart){
        this.chart.destroy();
        this.datasetsChar = [];
      }
      
      this.initCharts();
      
      const $this = this;

      this.fullData.sensors.forEach( (element, indexSensor) => {
        
        const data = [];

        element.registers.forEach(elementRegister => {
          
          if(indexSensor == 0)
            $this.chart.data.labels.push(elementRegister.created_at.split(" ")[1])

          data.push(elementRegister.quantity)
          
        });

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

      this.chart.update();

  }

  */
}
