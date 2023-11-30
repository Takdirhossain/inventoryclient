import { TestBed } from '@angular/core/testing';

import { DuePayService } from './due-pay.service';

describe('DuePayService', () => {
  let service: DuePayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuePayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
