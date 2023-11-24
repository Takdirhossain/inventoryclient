import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-profit',
  templateUrl: './profit.component.html',
  styleUrls: ['./profit.component.css']
})
export class ProfitComponent {
  data = []
  fileName = `Report.xlsx`;
  exportexcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
}

}
