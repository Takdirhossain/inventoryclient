import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../service/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../model/customer.model';
interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}
@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent {
  @Input() customer!: Customer;
  editCustomerForm!: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private customerService: CustomerService,
    private toaster: ToastrService
  ) {}
  ngOnInit() {
    this.setUp();
  }
  setUp() {
    const { required } = Validators;
    this.editCustomerForm = new FormGroup({
      name: new FormControl(this.customer.name, required),
      id: new FormControl(this.customer.id),
    });
  }

  get fc() {
    return this.editCustomerForm.controls;
  }

  updateCustomer() {
    const data = this.editCustomerForm.value;
    console.log(data);
    this.customerService.updateCustomer(data).subscribe(
      (res) => {
        if (res) {
          this.toaster.success('Update successfully');
          this.editCustomerForm.reset();
          this.activeModal.close();
        } else {
          this.toaster.error('Something went wrong');
          this.editCustomerForm.reset();
          this.activeModal.close();
        }
      },
      (error) => {
        this.toaster.error(error.message);
      }
    );
  }
}
