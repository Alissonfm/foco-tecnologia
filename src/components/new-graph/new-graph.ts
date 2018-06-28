import { Component, OnInit } from '@angular/core';
// import * as HighCharts from 'highcharts';
import { EquipmentServiceProvider } from '../../providers/equipment-service/equipment-service';

/**
 * Generated class for the NewGraphComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

declare var $: any;
declare var Highcharts: any;

@Component({
  selector: 'new-graph',
  templateUrl: 'new-graph.html'
})
export class NewGraphComponent implements OnInit {

  text: string;
  chart: any;

  constructor(
    public equipmentService: EquipmentServiceProvider
  ) {
    console.log('Hello NewGraphComponent Component');
    this.text = 'Hello World';
  }

  ionViewDidLoad(){}

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    
    $.getJSON('https://www.highcharts.com/samples/data/from-sql.php?callback=?', function (data) {

    data = [].concat(data, [[Date.UTC(2011, 9, 14, 19, 59), null, null, null, null]]);

    new Highcharts.stockChart('container', {
        chart: {
            // type: 'candlestick',
            zoomType: 'x',
            backgroundColor: "rgba(255,255,255,0)"
        },

        navigator: {
            adaptToUpdatedData: false,
            series: {
                data: data
            }
        },

        scrollbar: {
            liveRedraw: false
        },

        title: {
            text: 'AAPL history by the minute from 1998 to 2011'
        },

        subtitle: {
            text: 'Displaying 1.7 million data points in Highcharts Stock by async server loading'
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
            data: data,
            dataGrouping: {
                enabled: false
            }
          }]
        });
      });
      
  }
}