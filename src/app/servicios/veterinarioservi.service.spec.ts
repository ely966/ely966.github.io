import { TestBed } from '@angular/core/testing';

import { VeterinarioserviService } from './veterinarioservi.service';

describe('VeterinarioserviService', () => {
  let service: VeterinarioserviService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VeterinarioserviService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
