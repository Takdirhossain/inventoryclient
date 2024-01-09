import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Stock } from './../model/stock.model';
import { Component, Input } from '@angular/core';
import { StockService } from '../service/stock.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-selete-stock',
  templateUrl: './selete-stock.component.html',
  styleUrls: ['./selete-stock.component.css']
})
export class SeleteStockComponent {
  @Input() public stock!: Stock;
  constructor( public activeModal: NgbActiveModal, private stockservice: StockService, private toastr: ToastrService){}
  deleteExpense(id: any){
    this.stockservice.deleteStock(id).subscribe(
      (res) => {
        if (res) {
          this.activeModal.close();
          this.toastr.success('Delete successfully');
        } else {
          this.activeModal.close();
          this.toastr.error('Something went wrong');
        }
      },
      (error) => {
        this.activeModal.close();
        this.toastr.error("Delete successfully");
      }
    )
  }
}
