import { TestBed } from '@angular/core/testing';

import { CitasServiService } from './citas-servi.service';

describe('CitasServiService', () => {
  let service: CitasServiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitasServiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
