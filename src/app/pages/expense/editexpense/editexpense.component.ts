import { Component, Input, OnInit } from '@angular/core';
import { Expense } from '../model/expense.models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../service/expense.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editexpense',
  templateUrl: './editexpense.component.html',
  styleUrls: ['./editexpense.component.css'],
})
export class EditexpenseComponent implements OnInit {
  @Input() public expense!: Expense;
  expenseForm!: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private expenseService: ExpenseService,
    private toastr: ToastrService
  ) {}

  get fc() {
    return this.expenseForm.controls;
  }
  ngOnInit() {
    this.setup();
  }
  setup() {
    const { required } = Validators;
    this.expenseForm = new FormGroup({
      id: new FormControl(this.expense.id),
      amount: new FormControl(this.expense.amount, [required]),
      purpose: new FormControl(this.expense.purpose, [required]),
    });
  }

  updateExpense() {
    const data = this.expenseForm.value;
    this.expenseService.updateExpense(data).subscribe(
      (res) => {
        if (res) {
          this.toastr.success('Update successfully');
          this.expenseForm.reset();
          this.activeModal.close()
        } else {
          this.toastr.error('Something went wrong');
          this.expenseForm.reset();
          this.activeModal.close()
        }
      },
      (error) => {
        this.toastr.error(error.message);
       

      }
    );
  }
}
