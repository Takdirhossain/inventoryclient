import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartOptions } from 'chart.js/dist/types/index';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  chart: any;
  chart2: any;
  chart3: any;
   currentDate = new Date();
 datePart = this.currentDate.toDateString();
 timePart = this.currentDate.toTimeString().split(' ')[0];

 result = `${this.datePart} ${this.timePart}`;

  DATA_COUNT = 5;
  NUMBER_CFG = { count: this.DATA_COUNT, min: 0, max: 100 };
  ngOnInit() {
    this.createChart();
    this.createdoughnutChart();
    this.createStockChart()
  }
  createStockChart() {
    this.chart = new Chart('stockChart', {
      type: 'bar',
      data: {
        labels: ['', '', '', ''],
        datasets: [
          {
            type: 'bar',
            label: 'Total',
            data: ['20', '12', '25', '30'],
            backgroundColor: ['#9966FF', ],
            borderColor: ['white'],
            borderWidth: 1,
          },
          {
            type: 'bar',
            label: 'Total',
            data: ['25', '8', '11', '35'],
            backgroundColor: ['#36A2EB', ],
            borderColor: ['white'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        animation: {
          duration: 3000,
        },
        backgroundColor: 'black'
      },
    });
  }

  createdoughnutChart() {
    this.chart = new Chart('doughnutChart', {
      type: 'pie',
      data: {
        labels: ['', '', '', ''],
        datasets: [
          {
            label: 'Total',
            data: ['20', '12', '25', '30'],
            backgroundColor: ['#36A2EB', '#9966FF', '#525FE1', '#0bdbca'],
            borderColor: ['white'],
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        animation: {
          duration: 3000,
        }
      },
    });
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'line',
      data: {
        labels: ['10', '11', '12', '13', '14', '15', '16', '17'],
        datasets: [
          {

            label: 'Sales',
            data: ['10', '12', '15', '12', '15', '30', '21', '30'],
            borderColor: '#9966FF',
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 15,

          },

          {
            label: 'Profit',
            data: ['15', '9', '20', '21', '17', '11', '6', '9'],
            borderColor: '#36A2EB',
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 15,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
          interaction: {
            intersect: false,
          },
          tooltip: {
            callbacks: {

            }
          }
        },
        animation: {
          duration: 3000,
        },
        bezierCurve: false

      } as ChartOptions,
    });
  }
}
