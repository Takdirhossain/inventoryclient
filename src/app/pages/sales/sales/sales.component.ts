import { DatePipe, DecimalPipe } from '@angular/common';
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
import { InvoiceComponent } from 'src/app/module/invoice/invoice.component';

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
  totaldue: any
  localDate:string= ''
  telb_kg_previus: number = 0
  twentyfive_kg_previus: number = 0
  thirtythree_kg_previus: number = 0
  fourtyfive_kg_previus: number = 0
  thirtyfive_kg_previus: number = 0
  constructor( private datePipe:DatePipe,private config: NgSelectConfig ,private toast: ToastrService ,private elementRef: ElementRef, private modalService: NgbModal, private saleSarvice:SalesService, private customersService : CustomerService) {
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
    this.getLocalDate();
  }
  getLocalDate(): void {
    const currentDate = new Date();
    this.localDate= this.datePipe.transform(currentDate, 'yyyy-MM-dd')!;
    this.saleForm?.get('date')?.setValue(this.localDate);
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
     'date' : new FormControl(''),
     'pay': new FormControl(''),
     'due' : new FormControl(this.due),
     'customer_name': new FormControl('', required),
     'customer_id': new FormControl('', required),
     'is_due_bill': new FormControl(false)
    })
  }

  chooseCustomer(customer: any) {
   const id = customer.id
    this.totaldue = customer.due
   const name = customer.name
   this.saleForm?.get('customer_name')?.setValue(name);
   this.saleForm?.get('customer_id')?.setValue(id);
  }
  totalPay($event:any, ){
    const amount = parseInt($event.target.value)
    const newDue = this.totalPrice - amount
    this.due = newDue
    this.saleForm?.get('due')?.setValue(this.due)
  }
  suming($event: any, inputLabel: any){
    const price = parseInt($event.target.value)
    if(inputLabel == "price_twelve_kg"){
      const telb = this.saleForm?.get('twelve_kg')?.value;
      const currentCalculate = telb * price;
      const cal = this.totalPrice - this.telb_kg_previus
      this.totalPrice = cal + currentCalculate;
      this.telb_kg_previus = telb * price;
    }
    if(inputLabel == "price_twentyfive_kg"){
      const telb = this.saleForm?.get('twentyfive_kg')?.value
      const calculate = telb * price
      const cal = this.totalPrice - this.twentyfive_kg_previus
      this.totalPrice =cal + calculate
      this.twentyfive_kg_previus = telb * price;
    }

    if(inputLabel == "price_thirtythree_kg"){
      const telb = this.saleForm?.get('thirtythree_kg')?.value
      const calculate = telb * price
      const cal = this.totalPrice - this.thirtythree_kg_previus
      this.totalPrice =cal + calculate
      this.thirtythree_kg_previus = telb * price;
    }
    if(inputLabel == "price_thirtyfive_kg"){
      const telb = this.saleForm?.get('thirtyfive_kg')?.value
      const calculate = telb * price
      const cal = this.totalPrice - this.thirtyfive_kg_previus
      this.totalPrice =cal + calculate
      this.thirtyfive_kg_previus = telb * price;
    }

    if(inputLabel == "price_fourtyfive_kg"){
      const telb = this.saleForm?.get('fourtyfive_kg')?.value
      const calculate = telb * price
      const cal = this.totalPrice - this.fourtyfive_kg_previus
      this.totalPrice =cal + calculate
      this.fourtyfive_kg_previus = telb * price;
    }
   this.saleForm?.get('price')?.setValue(this.totalPrice);
  }

  save(){
    console.log(this.saleForm.value)
    markFormAsTouched(this.saleForm);
    if (this.saleForm.invalid) {
      return;
    }
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
    let update = {...data, isSale: true}
    this.saleSarvice.getSalesList(update).subscribe((res: DailySales[]) => {
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
    });
  }
  deletesale(event: any) {
    const modalRef = this.modalService.open(DeletesaleComponent);
    modalRef.componentInstance.id = event
  }
  editSales(event: DailySales) {
    const modalRef = this.modalService.open(EditsalesComponent, {size: 'lg'})
    modalRef.componentInstance.sales = event
    modalRef.componentInstance.customerlist = this.customerList
  }
  print(){
    const name = this.saleForm?.get('customer_name')?.value
    const twbkg = this.saleForm?.get('twelve_kg')?.value
    const totaltwbkg = this.saleForm?.get('price_twelve_kg')?.value
    const twbfivekg = this.saleForm?.get('twentyfive_kg')?.value
    const totaltwbfivekg = this.saleForm?.get('price_twentyfive_kg')?.value
    const thirthreekg = this.saleForm?.get('thirtythree_kg')?.value
    const totalthirthreekg = this.saleForm?.get('price_thirtythree_kg')?.value
    const thirtyfivekg = this.saleForm?.get('thirtyfive_kg')?.value
    const totalthirtyfivekg = this.saleForm?.get('price_thirtyfive_kg')?.value
    const fourtiyfivekg = this.saleForm?.get('fourtyfive_kg')?.value
    const totalfourtiyfivekg = this.saleForm?.get('price_fourtyfive_kg')?.value
    const total = this.saleForm?.get('price')?.value
    const pay = this.saleForm?.get('pay')?.value
    const date = this.saleForm?.get('date')?.value
    const due = this.totaldue + total - pay
    let data = {
      name: name,
      due: this.totaldue,
      twbkg: twbkg,
      twbfivekg: twbfivekg,
      thirthreekg: thirthreekg,
      thirtyfivekg: thirtyfivekg,
      fourtiyfivekg: fourtiyfivekg,
      subtotal: total,
      pay: pay,
      newdue: due,
      date: date,
      totaltwbkg: totaltwbkg,
      totaltwbfivekg: totaltwbfivekg,
      totalthirthreekg: totalthirthreekg,
      totalthirtyfivekg: totalthirtyfivekg,
      totalfourtiyfivekg: totalfourtiyfivekg
    }
    const modalRef = this.modalService.open(InvoiceComponent, {size: 'xl'})
    modalRef.componentInstance.data = data
  }
}
