import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleteStockComponent } from './selete-stock.component';

describe('SeleteStockComponent', () => {
  let component: SeleteStockComponent;
  let fixture: ComponentFixture<SeleteStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeleteStockComponent]
    });
    fixture = TestBed.createComponent(SeleteStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
