import { Component, Input } from '@angular/core';
import { Stock } from '../model/stock.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StockService } from '../service/stock.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.css']
})
export class EditStockComponent {
  @Input() public stock!: Stock;
  stockForm!: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private stockservice: StockService,
    private toastr: ToastrService,
   
  ) {}

  get fc() {
    return this.stockForm.controls;
  }
  ngOnInit() {
    this.setup();
  }
  setup() {
    const { required } = Validators;
    this.stockForm = new FormGroup({
      id: new FormControl(this.stock.id),
      twelve_kg: new FormControl(this.stock.twelve_kg, [required]),
      twentyfive_kg: new FormControl(this.stock.twentyfive_kg, [required]),
      thirtythree_kg: new FormControl(this.stock.thirtythree_kg, [required]),
      thirtyfive_kg: new FormControl(this.stock.thirtyfive_kg, [required]),
      fourtyfive_kg: new FormControl(this.stock.fourtyfive_kg, [required]),
      others_kg: new FormControl(this.stock.others_kg, [required]),
      empty_twelve_kg: new FormControl(this.stock.empty_twelve_kg, [required]),
      empty_twentyfive_kg: new FormControl(this.stock.empty_twentyfive_kg, [required]),
      empty_thirtythree_kg : new FormControl(this.stock.empty_thirtythree_kg,[required]),
      empty_thirtyfive_kg: new FormControl(this.stock.empty_thirtyfive_kg, [required]),
      empty_fourtyfive_kg: new FormControl(this.stock.empty_fourtyfive_kg, [required]),
      empty_others_kg: new FormControl(this.stock.empty_others_kg, [required]),
      price: new FormControl(this.stock.price, [required]),
      date: new FormControl(this.stock.date,[required]),
    });
  }

  updateStock(){
  const data = this.stockForm.value
  this.stockservice.updateStock(data).subscribe(
    (res) => {
      if (res) {
        this.toastr.success('Update successfully');
        this.stockForm.reset();
        this.activeModal.close()
      } else {
        this.toastr.error('Something went wrong');
        this.stockForm.reset();
        this.activeModal.close()
      }
    },
    (error) => {
      this.toastr.error(error.message);


    }
  )
}

}
