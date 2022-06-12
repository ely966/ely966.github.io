import { TestBed } from '@angular/core/testing';

import { ProtegerService } from './proteger.service';

describe('ProtegerService', () => {
  let service: ProtegerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtegerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
