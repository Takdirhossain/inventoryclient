
import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent {
  constructor(public activeModal: NgbActiveModal) {}
	@Input() name!: string;
  modalclose(){
    this.activeModal.close('Close click')
  }
  closeafterdelete(){
    this.activeModal.close('Close click')
  }
}
