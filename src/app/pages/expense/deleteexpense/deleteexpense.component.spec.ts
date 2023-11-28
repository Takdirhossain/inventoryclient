import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteexpenseComponent } from './deleteexpense.component';

describe('DeleteexpenseComponent', () => {
  let component: DeleteexpenseComponent;
  let fixture: ComponentFixture<DeleteexpenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteexpenseComponent]
    });
    fixture = TestBed.createComponent(DeleteexpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
