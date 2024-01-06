import { DecimalPipe } from '@angular/common';
import { Component, PipeTransform, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, of, startWith } from 'rxjs';
import { DeletesaleComponent } from '../deleteSales/deletesale.component';
import { EditsalesComponent } from '../editSales/editsales.component';

import { SalesService } from '../service/sales.service';
import { DailySales } from '../models/dailySales.models';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}



@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
  providers: [DecimalPipe],
})
export class SalesComponent implements OnInit {
  saleList:DailySales[] = []
  pagedSales: DailySales[] = [];
  currentPage = 1;
  itemsPerPage = 100;
  private searchText = new Subject<string>();
  private searchByDate = new Subject<string>();
  constructor( private modalService: NgbModal, private saleSarvice:SalesService) {}
  ngOnInit(){
    this.fetchList('')
    this.searchText
    .pipe(debounceTime(500), distinctUntilChanged())
    .subscribe((searchValue) => this.fetchList({ customer_name: searchValue }));
  }

  pageChanged(event: any): void {
    const startIndex = (event - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedSales = this.saleList.slice(startIndex, endIndex)
  }
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
  search(text: string) {
    this.searchText.next(text);

  }
  searchDate(text: string) {
    this.searchByDate.next(text);

  }

  fetchList(data:any) {

    this.saleSarvice.getSalesList(data).subscribe((res: DailySales[]) => {
      this.saleList = res
      this.pagedSales = this.saleList.slice(0, this.itemsPerPage)
    });
  }

  deletesale(event: any) {
    const modalRef = this.modalService.open(DeletesaleComponent);
    modalRef.componentInstance.id = event
  }
  editSales(event: DailySales) {
    const modalRef = this.modalService.open(EditsalesComponent)
    modalRef.componentInstance.sales = event
  }
}
