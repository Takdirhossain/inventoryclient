import { DeleteCustomerComponent } from '../deleteCustomer/delete-customer.component';
import { Component, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common'; // Import DecimalPipe
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCustomerComponent } from '../editCustomer/edit-customer.component';
import { CustomerService } from '../service/customer.service';
import { ApiResponse, Customer, Sale } from '../model/customer.model';
import { Toast, ToastrService } from 'ngx-toastr';
import { ReportComponent } from '../../report/report/report.component';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754,
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199,
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463,
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397,
  },
];


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [DecimalPipe], // Add DecimalPipe to the providers array
})
export class CustomersComponent {
  customer:ApiResponse[] = []
customerList: Customer[] = []
  shorintg: boolean = false;
  newCustomer!: FormGroup;

  constructor(
    pipe: DecimalPipe,
    private modalService: NgbModal,
    private customersService: CustomerService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.fetchCustomer();


    this.setup();
  }
  calculateTotalDue(): number {
    return this.customer.reduce((total, item) => total + item.total_due, 0);
  }
  get fc() {
    return this.newCustomer.controls;
  }
  setup() {
    this.newCustomer = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }
  save() {
    const data = this.newCustomer.value;
    this.customersService.addNewCustomer(data).subscribe(
      (res) => {
        this.fetchCustomer()
        this.toast.success("customer added successfully");
      },
      (error) => {
        this.fetchCustomer()
        this.toast.error('cant add new customer');
      }
    );
  }

  fetchCustomer() {
    this.customersService.getCustomerList().subscribe((res: any) => {
      this.customer = res;
      if (this.customer.length > 0) {
        this.customerList = this.customer.reduce((acc, dt) => acc.concat(dt.customers), [] as Customer[]);
        console.log(this.customerList);
      }
    });
  }

  deleteCustomer(customer: Customer) {
    const modelRef = this.modalService.open(DeleteCustomerComponent);
    modelRef.componentInstance.customer = customer;
  }
  editcustomer(customer: Customer) {
    const modelRef = this.modalService.open(EditCustomerComponent);
    modelRef.componentInstance.customer = customer;
    modelRef.result.then((res) => {
      if (res) {
        this.fetchCustomer();
      } else {
        this.fetchCustomer();
      }
    });
  }

  short() {
    this.shorintg = !this.shorintg;
  }
  lowTOHeight() {}
  heightToLow() {

  }
  generateReport(sales: any, name: string) {
  const modalRef = this.modalService.open(ReportComponent, { size: <any>'xl' })
  modalRef.componentInstance.sales = sales;
  modalRef.componentInstance.name = name;
  }
}
