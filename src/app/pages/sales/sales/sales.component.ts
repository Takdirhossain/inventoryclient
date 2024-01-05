import { DecimalPipe } from '@angular/common';
import { Component, PipeTransform, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map, of, startWith } from 'rxjs';
import { DeletesaleComponent } from '../deleteSales/deletesale.component';
import { EditsalesComponent } from '../editSales/editsales.component';
import { Sales } from '../models/sales.models';
import { SalesService } from '../service/sales.service';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}



@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
  providers: [DecimalPipe],
})
export class SalesComponent implements OnInit {
  saleList$:Sales[] = []
  constructor( private modalService: NgbModal, private saleSarvice:SalesService) {}

  ngOnInit(){
    this.fetchList()
  }

  fetchList() {
    let data = {}
    this.saleSarvice.getSalesList(data).subscribe((res: Sales[]) => {
      this.saleList$ = res
      this.saleList$.map(sale => console.log(sale))
    });
  }

  deletesale(event: any) {
    const modalRef = this.modalService.open(DeletesaleComponent);
    modalRef.componentInstance.id = event
  }
  editSales(event: Country) {
    const modalRef = this.modalService.open(EditsalesComponent)
    modalRef.componentInstance.sales = event
  }
}
