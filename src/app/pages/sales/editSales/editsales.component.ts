import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}
@Component({
  selector: 'app-editsales',
  templateUrl: './editsales.component.html',
  styleUrls: ['./editsales.component.css']
})
export class EditsalesComponent {
@Input() sales!: Country
constructor(public activeModal: NgbActiveModal) {}
}
