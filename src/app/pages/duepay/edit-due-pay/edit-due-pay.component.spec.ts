import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDuePayComponent } from './edit-due-pay.component';

describe('EditDuePayComponent', () => {
  let component: EditDuePayComponent;
  let fixture: ComponentFixture<EditDuePayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDuePayComponent]
    });
    fixture = TestBed.createComponent(EditDuePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
