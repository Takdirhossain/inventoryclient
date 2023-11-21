import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentselsComponent } from './recentsels.component';

describe('RecentselsComponent', () => {
  let component: RecentselsComponent;
  let fixture: ComponentFixture<RecentselsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentselsComponent]
    });
    fixture = TestBed.createComponent(RecentselsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
