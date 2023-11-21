import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletesaleComponent } from './deletesale.component';

describe('DeletesaleComponent', () => {
  let component: DeletesaleComponent;
  let fixture: ComponentFixture<DeletesaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletesaleComponent]
    });
    fixture = TestBed.createComponent(DeletesaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
