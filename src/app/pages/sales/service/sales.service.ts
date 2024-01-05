import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/core/api.constant';
import { Sales } from '../models/sales.models';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }

  getSalesList(data:any){
    return this.http.put<Sales[]>(API_URL + '/sales', data);
  }
}
