import { TestBed } from '@angular/core/testing';

import { ToogleServiceService } from './toogle-service.service';

describe('ToogleServiceService', () => {
  let service: ToogleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToogleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
