import { DecimalPipe } from '@angular/common';
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
  constructor(
    private stockService: StockService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.loading$ = this.stockService.loading$;
    this.searchText
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchValue) => this.fetchList({ date: searchValue }));
    this.fetchList('');
  }

  setup(){
    const {required, pattern} = Validators
    this.newStock = new FormGroup({
     'twelve_kg' : new FormControl('',)
    })
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
