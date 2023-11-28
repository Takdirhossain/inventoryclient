import { Component, Input } from '@angular/core';
import { Expense } from '../model/expense.models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExpenseService } from '../service/expense.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deleteexpense',
  templateUrl: './deleteexpense.component.html',
  styleUrls: ['./deleteexpense.component.css']
})
export class DeleteexpenseComponent {
  @Input() public expense!: Expense;
constructor( public activeModal: NgbActiveModal, private expenseService: ExpenseService, private toastr: ToastrService){}
deleteExpense(id: any){
  this.expenseService.deleteExpense(id).subscribe(
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
      this.toastr.error(error.message);
    }
  );
}


}
