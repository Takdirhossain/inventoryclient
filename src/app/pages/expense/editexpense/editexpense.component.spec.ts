import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditexpenseComponent } from './editexpense.component';

describe('EditexpenseComponent', () => {
  let component: EditexpenseComponent;
  let fixture: ComponentFixture<EditexpenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditexpenseComponent]
    });
    fixture = TestBed.createComponent(EditexpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
