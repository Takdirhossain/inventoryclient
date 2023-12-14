import { RecentCustomer, StockStates } from './../model/home.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/core/api.constant';
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getStockStates(data: any) {
    return this.http.put<StockStates>(API_URL + '/products/stock/states', data);
  }
  getLastStock(){
    return this.http.get(API_URL + '/products/laststock')
  }
  getRecentCustomer(){
    return this.http.get<RecentCustomer[]>(API_URL + '/customers/recentcustomers')
  }
}
