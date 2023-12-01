import { Customer } from './../model/customer.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/core/api.constant';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  getCustomerList(){
   return this.http.get<Customer[]>(API_URL+ '/customers')
  }
  updateCustomer(customer: Customer){
    return this.http.post(API_URL + '/customers/'+ customer.id, customer)
  }
}
