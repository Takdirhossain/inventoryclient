import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DailySales } from '../models/dailySales.models';
import { ApiResponse, Customer } from '../../customers/model/customer.model';
import { CustomerService } from '../../customers/service/customer.service';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-editsales',
  templateUrl: './editsales.component.html',
  styleUrls: ['./editsales.component.css']
})
export class EditsalesComponent {
@Input() sales!: DailySales
saleForm! : FormGroup
customerList: Customer[] = []
customer:ApiResponse[] = []
constructor(public activeModal: NgbActiveModal, private customersService : CustomerService, private config: NgSelectConfig) {
  this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
}
ngOnInit(){
  this.setup()
  this.fetchCustomer('')
}
setup(){
  const {required, pattern} = Validators
  this.saleForm = new FormGroup({
   'twelve_kg' : new FormControl(this.sales.twelve_kg || 0,),
   'twentyfive_kg' : new FormControl(this.sales.twentyfive_kg || 0,),
   'thirtythree_kg' : new FormControl(this.sales.thirtythree_kg || 0,),
   'thirtyfive_kg' : new FormControl(this.sales.thirtyfive_kg || 0),
   'fourtyfive_kg' : new FormControl(this.sales.fourtyfive_kg || 0,),
   'others_kg' : new FormControl(this.sales.others_kg || 0,),
   'empty_twelve_kg' : new FormControl(this.sales.empty_twelve_kg || 0,),
   'empty_twentyfive_kg' : new FormControl(this.sales.empty_twentyfive_kg || 0,),
   'empty_thirtythree_kg' : new FormControl(this.sales.empty_thirtythree_kg || 0,),
   'empty_thirtyfive_kg' : new FormControl(this.sales.empty_thirtyfive_kg || 0,),
   'empty_fourtyfive_kg' : new FormControl(this.sales.empty_fourtyfive_kg || 0,),
   'empty_others_kg' : new FormControl(this.sales.empty_others_kg || 0,),
   'price_twelve_kg' : new FormControl('',),
   'price_twentyfive_kg' : new FormControl('',),
   'price_thirtythree_kg' : new FormControl('',),
   'price_thirtyfive_kg' : new FormControl('',),
   'price_fourtyfive_kg' : new FormControl('',),
   'price_others_kg' : new FormControl('',),
   'price': new FormControl(this.sales.price),
   'date' : new FormControl(this.sales.date, required),
   'pay': new FormControl(this.sales.pay),
   'due' : new FormControl(this.sales.due),
   'customer_name': new FormControl(this.sales.customer_name, required),
   'customer_id': new FormControl(this.sales.customer_id, required),
   'is_due_bill': new FormControl(false)
  })
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
chooseCustomer(customer: any){}
update(){}

}
