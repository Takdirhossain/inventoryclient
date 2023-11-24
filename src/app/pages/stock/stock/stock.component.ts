import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map, startWith } from 'rxjs';
import { EditStockComponent } from '../edit-stock/edit-stock.component';
import { SeleteStockComponent } from '../selete-stock/selete-stock.component';


interface Country {
	name: string;
	flag: string;
	area: number;
	population: number;
}
const COUNTRIES: Country[] = [
	{
		name: 'Russia',
		flag: 'f/f3/Flag_of_Russia.svg',
		area: 17075200,
		population: 146989754,
	},
	{
		name: 'Canada',
		flag: 'c/cf/Flag_of_Canada.svg',
		area: 9976140,
		population: 36624199,
	},
	{
		name: 'United States',
		flag: 'a/a4/Flag_of_the_United_States.svg',
		area: 9629091,
		population: 324459463,
	},
	{
		name: 'China',
		flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
		area: 9596960,
		population: 1409517397,
	},
];
function search(text: string, pipe: PipeTransform): Country[] {
  console.log(text);
	return COUNTRIES.filter((country) => {
    const term = text.toLowerCase();
    return (
      country.name.toLowerCase().includes(term) ||
      pipe.transform(country.area).toString().includes(term) ||
      pipe.transform(country.population).toString().includes(term)
    );
  });
}
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
	countries$: Observable<Country[]>;
	filter = new FormControl('', { nonNullable: true });
  constructor(pipe: DecimalPipe, private modalService:NgbModal) {
		this.countries$ = this.filter.valueChanges.pipe(
			startWith(''),
			map((text) => search(text, pipe)),
		);
	}
  editStock(event:any){
    const modalRef = this.modalService.open(EditStockComponent)
    modalRef.componentInstance.sales = event
  }
  deletStock(id:any){
    const modaRef = this.modalService.open(SeleteStockComponent)
    modaRef.componentInstance.id = id
  }
}
