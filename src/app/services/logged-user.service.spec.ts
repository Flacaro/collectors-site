import { TestBed } from '@angular/core/testing';

import { LoggedCollectorService } from './logged-collector.service';

describe('LoggedUserService', () => {
  let service: LoggedCollectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedCollectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
