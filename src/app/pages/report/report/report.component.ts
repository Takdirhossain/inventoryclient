import { Component, Input } from '@angular/core';
import * as XLSX from 'xlsx';
import { Sales } from '../../sales/models/sales.models';
import { NgbActiveModal, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  @Input()sales!: Sales[]
  @Input() name!: any
  pagedSales: Sales[] = [];
  currentPage = 1;
  itemsPerPage = 30;
  fileName = `${this.name}Report.xlsx`;
  ngOnInit(){
    this.pagedSales = this.sales.slice(0,this.itemsPerPage)
  }

	constructor(public activeModal: NgbActiveModal) {}
  pageChanged(event: any): void {
    const startIndex = (event - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedSales = this.sales.slice(startIndex, endIndex)
  }
  exportexcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.pagedSales);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
}


}
