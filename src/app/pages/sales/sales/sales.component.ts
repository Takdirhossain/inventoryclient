import { DecimalPipe } from '@angular/common';
import { Component, PipeTransform, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, NgSelectOption, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, of, startWith } from 'rxjs';
import { DeletesaleComponent } from '../deleteSales/deletesale.component';
import { EditsalesComponent } from '../editSales/editsales.component';

import { SalesService } from '../service/sales.service';
import { DailySales } from '../models/dailySales.models';
import { markFormAsTouched } from 'src/app/core/form.helper';
import { CustomerService } from '../../customers/service/customer.service';
import { ApiResponse, Customer } from '../../customers/model/customer.model';
import { ToastrService } from 'ngx-toastr';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
  providers: [DecimalPipe],
})
export class SalesComponent implements OnInit  {
  saleList:DailySales[] = []
  pagedSales: DailySales[] = [];
  customerList: Customer[] = []
  customer:ApiResponse[] = []
  currentPage = 1;
  itemsPerPage = 100;
  saleForm! : FormGroup
  totalPrice: number = 0;
  private searchText = new Subject<string>();
  private searchByDate = new Subject<string>();
  formError: any = null;
  due: number = 0
  selectedCustomer: string = '';
  selectedCustomerId: string = '';
  selectedCar: number = 0

  constructor( private config: NgSelectConfig ,private toast: ToastrService ,private elementRef: ElementRef, private modalService: NgbModal, private saleSarvice:SalesService, private customersService : CustomerService) {
    this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
  }

  ngOnInit(){
    this.fetchList('')
    this.fetchCustomer('')
    this.setup()
    this.searchText
    .pipe(debounceTime(500), distinctUntilChanged())
    .subscribe((searchValue) => this.fetchList({ customer_name: searchValue }));
    this.searchByDate
    .pipe(debounceTime(500), distinctUntilChanged())
    .subscribe((searchValue) => this.fetchList({ date: searchValue }));
  }


  setup(){
    const {required, pattern} = Validators
    this.saleForm = new FormGroup({
     'twelve_kg' : new FormControl('',),
     'twentyfive_kg' : new FormControl('',),
     'thirtythree_kg' : new FormControl('',),
     'thirtyfive_kg' : new FormControl('',),
     'fourtyfive_kg' : new FormControl('',),
     'others_kg' : new FormControl('',),
     'empty_twelve_kg' : new FormControl('',),
     'empty_twentyfive_kg' : new FormControl('',),
     'empty_thirtythree_kg' : new FormControl('',),
     'empty_thirtyfive_kg' : new FormControl('',),
     'empty_fourtyfive_kg' : new FormControl('',),
     'empty_others_kg' : new FormControl('',),
     'price_twelve_kg' : new FormControl('',),
     'price_twentyfive_kg' : new FormControl('',),
     'price_thirtythree_kg' : new FormControl('',),
     'price_thirtyfive_kg' : new FormControl('',),
     'price_fourtyfive_kg' : new FormControl('',),
     'price_others_kg' : new FormControl('',),
     'price': new FormControl(this.totalPrice, required),
     'date' : new FormControl('', required),
     'pay': new FormControl(''),
     'due' : new FormControl(this.due),
     'customer_name': new FormControl('', required),
     'customer_id': new FormControl('', required),
     'is_due_bill': new FormControl(false)
    })
  }

   get dateControl() {
    return this.saleForm.get('date');
  }
  formatDate(date: Date): string {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
  }
  chooseCustomer(customer: any) {
   const id = customer.id
   const name = customer.name
   this.saleForm?.get('customer_name')?.setValue(name);
   this.saleForm?.get('customer_id')?.setValue(id);
  }
  totalPay($event:any){
    const amount = parseInt($event.target.value)
    const newDue = this.totalPrice - amount
    this.due = newDue
    this.saleForm?.get('due')?.setValue(this.due)
  }
  suming($event: any){
   const price = parseInt($event.target.value)
   this.totalPrice = this.totalPrice + price
   this.saleForm?.get('price')?.setValue(this.totalPrice);
  }

  save(){
    const saleData = this.saleForm?.value
    this.saleSarvice.addNewSale(saleData).subscribe((response) => {
      this.toast.success("success")
      this.saleForm.reset();
      this.fetchList('')
    })
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

  fetchCustomer(event: any) {
    this.customersService.getCustomerList(event).subscribe((res: any) => {
      this.customer = res;
      if (this.customer.length > 0) {
        this.customerList = this.customer.reduce((acc, dt) => acc.concat(dt.customers), [] as Customer[]);
      }
      console.log(this.customerList);
    });
  }


  deletesale(event: any) {
    const modalRef = this.modalService.open(DeletesaleComponent);
    modalRef.componentInstance.id = event
  }
  editSales(event: DailySales) {
    const modalRef = this.modalService.open(EditsalesComponent, {size: 'lg'})
    modalRef.componentInstance.sales = event
  }
}
