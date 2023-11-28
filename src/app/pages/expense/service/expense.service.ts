import { Expense } from './../model/expense.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import {API_URL} from "../../../core/api.constant"


@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient) {}
  fethchExpense() {
    return this.http.get<Expense[]>( API_URL+'/expense');
  }
  newExpense(data: any) {
    return this.http.post( API_URL+'/expense', data);
  }
  updateExpense(data: Expense){
    return this.http.post(API_URL+'/expense/' + data.id , data);
  }
  deleteExpense(id:any){
    return this.http.delete(API_URL+'/expense/'+ id)
  }
}
