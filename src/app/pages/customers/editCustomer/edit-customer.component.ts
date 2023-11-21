import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}
@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent {
  constructor(public activeModal: NgbActiveModal) {}
  @Input() customer!: Country;
  updateCustomer(){
    this.activeModal.close('Close click')
  }
}
