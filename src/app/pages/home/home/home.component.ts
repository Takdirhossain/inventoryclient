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

  DATA_COUNT = 5;
  NUMBER_CFG = { count: this.DATA_COUNT, min: 0, max: 100 };
  ngOnInit() {
    this.createChart();
    this.createdoughnutChart();
  }

  createdoughnutChart() {
    this.chart = new Chart('doughnutChart', {
      type: 'pie',
      data: {
        labels: ['12KG', '25KG', '35KG', '45KG'],
        datasets: [
          {
            label: 'Total',
            data: ['20', '12', '25', '30'],
            backgroundColor: ['#0bdb3f', '#cddb0b', '#db230b', '#0bdbca'],
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
            backgroundColor: 'blue',
            fill: false,
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15,
          },

          {
            label: 'Profit',
            data: ['15', '9', '20', '21', '17', '11', '6', '9'],
            backgroundColor: 'green',
            pointStyle: 'circle',
            pointRadius: 10,
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
        },
        animation: {
          duration: 3000,
        }
      } as ChartOptions,
    });
  }
}
