import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/core/api.constant';
import { Stock } from '../model/stock.model';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StockService {

private loadingSubject = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) { }

    get loading$(): Observable<boolean> {
      return this.loadingSubject.asObservable();
    }
getProductList(data: any){
  this.loadingSubject.next(true);
  return this.http.put<Stock[]>(API_URL + '/products', data).pipe(
    finalize(() => this.loadingSubject.next(false))
)}

}
