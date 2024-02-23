import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent {
  @Input() data!: any;
  invoiceNo: any;
  ngOnInit() {
    this.generateRandomString()
  }

  generateRandomString() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const length = 10;
    let randomString = '#';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }
    this.invoiceNo = randomString;
    return randomString;
  }

  constructor(public activeModal: NgbActiveModal) {}
  printInvoice() {
    let wrapper = document.querySelector('.wrapper');
    if (wrapper) {
      let printContents = wrapper.innerHTML;
      let originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    } else {
      console.error('Wrapper element not found');
    }
  }
}
