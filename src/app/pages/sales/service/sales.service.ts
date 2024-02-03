import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/core/api.constant';
import { DailySales } from '../models/dailySales.models';


@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }

  getSalesList(data:any){
    return this.http.put<DailySales[]>(API_URL + '/sales', data);
  }
  addNewSale( sale: any){
    return this.http.post(API_URL+'/sales', sale)
  }
}
