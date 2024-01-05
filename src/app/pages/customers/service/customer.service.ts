import { ApiResponse, Customer } from './../model/customer.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/core/api.constant';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  addNewCustomer(data: any){
    return this.http.post(API_URL+'/customers', data)
  }
  getCustomerList(){
   return this.http.get <ApiResponse> (API_URL+ '/customers')
  }
  updateCustomer(customer: Customer){
    return this.http.post(API_URL + '/customers/'+ customer.id, customer)
  }
  deleteCustomer(id: number){
    return this.http.delete(API_URL + '/customers'+ id)
  }
}
