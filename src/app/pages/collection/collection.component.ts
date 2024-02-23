import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customers/service/customer.service';
import { ApiResponse, Customer } from '../customers/model/customer.model';
import { SalesService } from '../sales/service/sales.service';
import { ToastrService } from 'ngx-toastr';
import { DailySales } from '../sales/models/dailySales.models';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { markFormAsTouched } from 'src/app/core/form.helper';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent {
  collectionForm!: FormGroup
  saleList:DailySales[] = []
  pagedSales: DailySales[] = [];
  customerList: Customer[] = []
  customer:ApiResponse[] = []
  currentPage = 1;
  itemsPerPage = 100;
  private searchText = new Subject<string>();
  private searchByDate = new Subject<string>();
  constructor(private customersService : CustomerService, private saleSarvice:SalesService, private toast: ToastrService){}
  ngOnInit(){
    this.fetchCustomer('')
    this.setup()
    this.fetchList("")
    this.searchText
    .pipe(debounceTime(500), distinctUntilChanged())
    .subscribe((searchValue) => this.fetchList({ customer_name: searchValue }));
    this.searchByDate
    .pipe(debounceTime(500), distinctUntilChanged())
    .subscribe((searchValue) => this.fetchList({ date: searchValue }));
  }
  setup(){
    const {required, pattern} = Validators
    this.collectionForm = new FormGroup({
     'price': new FormControl(0),
     'date' : new FormControl('', required),
     'pay': new FormControl('', required),
     'due' : new FormControl(0),
     'customer_name': new FormControl('', required),
     'customer_id': new FormControl('', required),
     'is_due_bill': new FormControl(true)
    })
  }
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
  chooseCustomer(customer: any) {
    const id = customer.id
    const name = customer.name
    this.collectionForm?.get('customer_name')?.setValue(name);
    this.collectionForm?.get('customer_id')?.setValue(id);
   }

   search(text: string) {
    this.searchText.next(text);

  }
  searchDate(text: string) {
    this.searchByDate.next(text);
  }

  fetchCustomer(event: any) {
    this.customersService.getCustomerList(event).subscribe((res: any) => {
      this.customer = res;
      if (this.customer.length > 0) {
        this.customerList = this.customer.reduce((acc, dt) => acc.concat(dt.customers), [] as Customer[]);
      }
    });
  }
  save(){
    markFormAsTouched(this.collectionForm)
    if(this.collectionForm.invalid) return
    const value = this.collectionForm.value
    this.saleSarvice.addNewSale(value).subscribe((response) => {
      this.fetchList("")
      if(response){
        this.toast.success("Collection add success")
      }

    })
  }
  fetchList(data:any) {
    let update = {...data, isSale: false}
    this.saleSarvice.getSalesList(update).subscribe((res: DailySales[]) => {
      this.saleList = res
      this.pagedSales = this.saleList.slice(0, this.itemsPerPage)
      console.log(res)
    });
  }
}
