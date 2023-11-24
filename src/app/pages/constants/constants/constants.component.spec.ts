import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantsComponent } from './constants.component';

describe('ConstantsComponent', () => {
  let component: ConstantsComponent;
  let fixture: ComponentFixture<ConstantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConstantsComponent]
    });
    fixture = TestBed.createComponent(ConstantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
