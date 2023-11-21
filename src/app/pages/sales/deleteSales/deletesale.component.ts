import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-deletesale',
  templateUrl: './deletesale.component.html',
  styleUrls: ['./deletesale.component.css']
})
export class DeletesaleComponent {
@Input() name:any
constructor(public activeModal: NgbActiveModal) {}
}
