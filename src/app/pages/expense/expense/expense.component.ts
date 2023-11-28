import { EditexpenseComponent } from './../editexpense/editexpense.component';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Expense } from '../model/expense.models';
import { ExpenseService } from '../service/expense.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteexpenseComponent } from '../deleteexpense/deleteexpense.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
})
export class ExpenseComponent implements OnInit {
  expenses$!: Observable<Expense[]>;
  expenseForm!: FormGroup;

  constructor(
    private expenseService: ExpenseService,
    private toastr: ToastrService,
    private modal: NgbModal
  ) {}

  get fc() {
    return this.expenseForm.controls;
  }

  setup() {
    const { required } = Validators;
    this.expenseForm = new FormGroup({
      amount: new FormControl('', [required]),
      purpose: new FormControl('', [required]),
    });
  }

  ngOnInit() {
    this.getExpenseList();
    this.setup();
  }

  newExpense() {
    const data = this.expenseForm.value;
    this.expenseService.newExpense(data).subscribe(
      (res) => {
        if (res) {
          this.toastr.success('Expense added successfully');
          this.getExpenseList();
          this.expenseForm.reset();
        } else {
          this.toastr.error('Something went wrong');
          this.expenseForm.reset();
        }
      },
      (error) => {
        this.toastr.error(error.message);
        this.expenseForm.reset();
      }
    );
  }

  getExpenseList() {
    this.expenseService.fethchExpense().subscribe((response: Expense[]) => {
      this.expenses$ = of(response);
    });
  }
  editexpense(expense: Expense) {
    const modalref = this.modal.open(EditexpenseComponent);
    modalref.componentInstance.expense = expense;
    modalref.result.then((response) => {
      if (response) {
        this.getExpenseList();
      } else {
        this.getExpenseList();
      }
    });
  }
  deleteExpense(expense:Expense) {
    const modalref = this.modal.open(DeleteexpenseComponent);
    modalref.componentInstance.expense = expense;
    modalref.result.then((response) => {
      if (response) {
        this.getExpenseList();
      } else {
        this.getExpenseList();
      }
    })
  }
}
