import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuepayComponent } from './duepay.component';

describe('DuepayComponent', () => {
  let component: DuepayComponent;
  let fixture: ComponentFixture<DuepayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuepayComponent]
    });
    fixture = TestBed.createComponent(DuepayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
