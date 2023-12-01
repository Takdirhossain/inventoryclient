import { DeleteCustomerComponent } from '../deleteCustomer/delete-customer.component';
import { Component, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common'; // Import DecimalPipe
import { FormControl, NgModel } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCustomerComponent } from '../editCustomer/edit-customer.component';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../model/customer.model';


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

function search(text: string, pipe: PipeTransform): Country[] {
  return COUNTRIES.filter((country) => {
    const term = text.toLowerCase();
    return (
      country.name.toLowerCase().includes(term) ||
      pipe.transform(country.area).includes(term) ||
      pipe.transform(country.population).includes(term)
    );
  });
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [DecimalPipe], // Add DecimalPipe to the providers array
})
export class CustomersComponent {
customer$: Observable<Customer[]> = new Observable
  filter = new FormControl('', { nonNullable: true });
  shorintg : boolean = false

  constructor(pipe: DecimalPipe, private modalService: NgbModal, private customersService: CustomerService) {}
  ngOnInit(){
    this.fetchCustomer()
  }

fetchCustomer(){
this.customersService.getCustomerList().subscribe((res:Customer[]) => {
this.customer$ = of(res);

})
}

  deleteCustomer(id: number) {
    const modelRef = this.modalService.open(DeleteCustomerComponent);
    modelRef.componentInstance.id = id;
  }
  editcustomer(customer: Customer){

    const modelRef = this.modalService.open(EditCustomerComponent)
    modelRef.componentInstance.customer = customer;
    modelRef.result.then(res => {
      if(res){
        this.fetchCustomer()
      }else{
        this.fetchCustomer()
      }
    })
  }


  short(){
    this.shorintg = !this.shorintg;
  }
  lowTOHeight(){

  }
  heightToLow(){
    console.log("height to low will call");
  }
}
