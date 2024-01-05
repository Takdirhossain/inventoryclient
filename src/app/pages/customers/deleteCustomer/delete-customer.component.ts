
import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../service/customer.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent {
  constructor(public activeModal: NgbActiveModal, private customerService: CustomerService, private toaster: ToastrService) {}
	@Input() customer!: Customer;
  modalclose(){
    this.activeModal.close('Close click')
  }
  closeafterdelete(id: number){
this.customerService.deleteCustomer(id).subscribe((res) => {

},
(error) => {

  this.toaster.error('cant delete customer');
}
)
    this.activeModal.close('Close click')
  }
}
