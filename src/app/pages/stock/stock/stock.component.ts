import { DatePipe, DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, PipeTransform } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { EditStockComponent } from '../edit-stock/edit-stock.component';
import { SeleteStockComponent } from '../selete-stock/selete-stock.component';
import { StockService } from '../service/stock.service';
import { Stock } from '../model/stock.model';
import { ToastrService } from 'ngx-toastr';
import { markFormAsTouched } from 'src/app/core/form.helper';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent {
  private searchText = new Subject<string>();
  products$: Stock[] = []
  loading$!: Observable<boolean>;
  newStock!: FormGroup
  pagedSales: Stock[] = [];
  currentPage = 1;
  itemsPerPage = 60;
  formError: any = null;
  constructor(
    private stockService: StockService,
    private modalService: NgbModal,
    private datePipe: DatePipe,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.loading$ = this.stockService.loading$;
    this.searchText
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchValue) => this.fetchList({ date: searchValue }));
    this.fetchList('');
    this.setup()
  }

  setup(){
    const {required, pattern} = Validators
    this.newStock = new FormGroup({
     'twelve_kg' : new FormControl('',),
     'twentyfive_kg' : new FormControl('',),
     'thirtythree_kg' : new FormControl('',),
     'thirtyfive_kg' : new FormControl('',),
     'fourtyfive_kg' : new FormControl('',),
     'others_kg' : new FormControl('',),
     'empty_twelve_kg' : new FormControl('',),
     'empty_twentyfive_kg' : new FormControl('',),
     'empty_thirtythree_kg' : new FormControl('',),
     'empty_thirtyfive_kg' : new FormControl('',),
     'empty_fourtyfive_kg' : new FormControl('',),
     'empty_others_kg' : new FormControl('',),
     'price' : new FormControl('', required),
     'date' : new FormControl('', required),
    })
  }
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy') || '';
  }

  pageChanged(event: any): void {
    const startIndex = (event - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedSales = this.products$?.slice(startIndex, endIndex)
  }
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
  search(text: string) {
    this.searchText.next(text);
  }

  addNewStock(){
    this.formError = null;
    markFormAsTouched(this.newStock);

    if (this.newStock.invalid) {
        return;
    }
    const rawDateValue = this.newStock.get('date')?.value;
    const formattedDate = this.formatDate(rawDateValue);
    this.newStock.get('date')?.setValue(formattedDate)
    const formData = this.newStock?.value
    console.log(formData);
    this.stockService.addNewStock(formData).subscribe(
      (res) => {
        this.fetchList('')
        this.toast.success("customer added successfully");
        this.newStock.reset()
      },
      (error) => {
        this.fetchList('')
        this.toast.error('cant add new customer');
      }
    );
  }

  fetchList(data: any) {
    this.stockService.getProductList(data).subscribe((res: Stock[]) => {
      this.products$ = res
      this.pagedSales = this.products$.slice(0,this.itemsPerPage)
    });
  }

  editStock(event: Stock) {
    const modalRef = this.modalService.open(EditStockComponent, { size: 'xl' });
    modalRef.componentInstance.stock = event;
    modalRef.result.then((response) => {
      if (response) {
        this.fetchList('');
      } else {
        this.fetchList('');
      }
    });
  }
  deletStock(stock: Stock) {
    const modaRef = this.modalService.open(SeleteStockComponent);
    modaRef.componentInstance.stock = stock;
    modaRef.result.then((response) => {
      if(response){
        this.fetchList('')
      }else{
        this.fetchList('')
      }
    })
  }
}
