import { TestBed } from '@angular/core/testing';

import { EtapeProductionService } from './etape-production.service';

describe('EtapeProductionService', () => {
  let service: EtapeProductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtapeProductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
