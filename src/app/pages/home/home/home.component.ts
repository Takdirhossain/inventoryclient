import { Stock, StockUpdate } from './../../stock/model/stock.model';
import { RecentCustomer, StockStates } from './../model/home.model';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartOptions } from 'chart.js/dist/types/index';
import { HomeService } from '../service/home.service';
import { Observable, of } from 'rxjs';
import { CustomerService } from '../../customers/service/customer.service';
import { ApiResponse } from '../../customers/model/customer.model';
import { StockService } from '../../stock/service/stock.service';
import { DailySales } from '../../sales/models/dailySales.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  chart: any;
  customer: ApiResponse[] = [];
  lastStock: any;
  saleList:DailySales[] = []
  recentCustomer$: Observable<RecentCustomer[]> = new Observable<RecentCustomer[]>();
  stockStates!: StockStates;
  stockstatesDay: number = 60;
  currentDate = new Date();
  datePart = this.currentDate.toDateString();
  timePart = this.currentDate.toTimeString().split(' ')[0];
  result = `${this.datePart} ${this.timePart}`;
  stockCal!: StockUpdate;
  DATA_COUNT = 5;
  NUMBER_CFG = { count: this.DATA_COUNT, min: 0, max: 100 };
  monthSale: number = 0
  todaySales: number = 0
  ngOnInit() {
    this.state();
    this.fetchlastStock();
    this.fetchRecentCustomers();
    this.fetchCustomer('');
    this.stockUpdate();
    this.thisMonthsSale();
    this.todaySale();
  }

  constructor(
    private homeservice: HomeService,
    private stockService: StockService,
    private customersService: CustomerService
  ) {}

  thisMonthsSale(){
    this.homeservice.thisMonthSale().subscribe((res: any) => {
      this.monthSale = res
    })
  }
  todaySale(){
    this.homeservice.todaySales().subscribe((res: any) => {
      this.todaySales = res
    })
  }
  fetchList() {
    this.homeservice.recentSale().subscribe((res:any) => {
      this.saleList = res
    });
  }

  stockUpdate() {
    this.stockService.getStock().subscribe((res: any) => {
      this.stockCal = res;
    });
  }

  //Last stock
  fetchlastStock() {
    this.homeservice.getLastStock().subscribe((data) => {
      this.lastStock = data;
      console.log(this.lastStock);
    });
  }

  fetchCustomer(event: any) {
    this.customersService.getCustomerList(event).subscribe((res: any) => {
      this.customer = res;
      console.log(this.customer);
    });
  }

  //get recent customer
  fetchRecentCustomers() {
    this.homeservice.getRecentCustomer().subscribe((res: RecentCustomer[]) => {
      this.recentCustomer$ = of(res);
    });
  }
  // Get Stock states
  state() {
    const data = { days: this.stockstatesDay };
    this.homeservice.getStockStates(data).subscribe((res) => {
      this.stockStates = res;
      this.updateDoughnutChart();
      this.createStockChart();
    });
  }

  stateSelectDay(day: number) {
    this.stockstatesDay = day;
    this.state();
  }

  updateDoughnutChart() {
    if (this.chart) {
      // Update chart data and redraw
      this.chart.data.datasets[0].data = [
        this.stockStates.twelve_kg,
        this.stockStates.twentyfive_kg,
        this.stockStates.thirtythree_kg,
        this.stockStates.thirtyfive_kg,
        this.stockStates.fourtyfive_kg,
      ];
      this.chart.update();
    } else {
      // Create new chart
      this.chart = new Chart('doughnutChart', {
        type: 'pie',
        data: {
          labels: ['12Kg', '25Kg', '33Kg', '35Kg', '45Kg'],
          datasets: [
            {
              label: 'Total',
              data: [
                this.stockStates.twelve_kg,
                this.stockStates.twentyfive_kg,
                this.stockStates.thirtythree_kg,
                this.stockStates.thirtyfive_kg,
                this.stockStates.fourtyfive_kg,
              ],
              backgroundColor: [
                '#36A2EB',
                '#9966FF',
                '#525FE1',
                '#0bdbca',
                '#0766AD',
              ],
              borderColor: ['white'],
              borderWidth: 3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 3000,
          },
        },
      });
    }
  }

  createStockChart() {
    this.chart = new Chart('stockChart', {
      type: 'bar',
      data: {
        labels: ['', '', '', '', ''],
        datasets: [
          {
            type: 'bar',
            label: 'Total',
            data: [
              this.stockCal.net_stock_twelve_kg,
              this.stockCal.net_stock_twentyfive_kg,
              this.stockCal.net_stock_thirtythree_kg,
              this.stockCal.net_stock_thirtyfive_kg,
              this.stockCal.net_stock_fourtyfive_kg,
            ],
            backgroundColor: ['#9966FF'],
            borderColor: ['white'],
            borderWidth: 1,
          },
          {
            type: 'bar',
            label: 'Total',
            data: [
              this.stockCal.net_stock_empty_twelve_kg,
              this.stockCal.net_stock_empty_twentyfive_kg,
              this.stockCal.net_stock_empty_thirtythree_kg,
              this.stockCal.net_stock_empty_thirtyfive_kg,
              this.stockCal.net_stock_empty_fourtyfive_kg,
            ],
            backgroundColor: ['#36A2EB'],
            borderColor: ['white'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 3000,
        },
        backgroundColor: 'black',
      },
    });
  }

  // createChart() {
  //   this.chart = new Chart('MyChart', {
  //     type: 'line',
  //     data: {
  //       labels: ['10', '11', '12', '13', '14', '15', '16', '17'],
  //       datasets: [
  //         {
  //           label: 'Sales',
  //           data: ['10', '12', '15', '12', '15', '30', '21', '30'],
  //           borderColor: '#9966FF',
  //           pointStyle: 'circle',
  //           pointRadius: 5,
  //           pointHoverRadius: 15,
  //         },

  //         {
  //           label: 'Profit',
  //           data: ['15', '9', '20', '21', '17', '11', '6', '9'],
  //           borderColor: '#36A2EB',
  //           pointStyle: 'circle',
  //           pointRadius: 5,
  //           pointHoverRadius: 15,
  //         },
  //       ],
  //     },
  //     options: {
  //       aspectRatio: 2.5,
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       plugins: {
  //         legend: {
  //           position: 'top',
  //         },
  //         title: {
  //           display: true,
  //           text: 'Chart.js Line Chart',
  //         },
  //         interaction: {
  //           intersect: false,
  //         },
  //         tooltip: {
  //           callbacks: {},
  //         },
  //       },
  //       animation: {
  //         duration: 3000,
  //       },
  //       bezierCurve: false,
  //     } as ChartOptions,
  //   });
  // }
}
