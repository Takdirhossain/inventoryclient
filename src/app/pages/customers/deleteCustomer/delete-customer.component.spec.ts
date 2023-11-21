import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCustomerComponent } from './delete-customer.component';

describe('DeleteCustomerComponent', () => {
  let component: DeleteCustomerComponent;
  let fixture: ComponentFixture<DeleteCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteCustomerComponent]
    });
    fixture = TestBed.createComponent(DeleteCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
