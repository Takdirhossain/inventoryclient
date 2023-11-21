import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsalesComponent } from './editsales.component';

describe('EditsalesComponent', () => {
  let component: EditsalesComponent;
  let fixture: ComponentFixture<EditsalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditsalesComponent]
    });
    fixture = TestBed.createComponent(EditsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
