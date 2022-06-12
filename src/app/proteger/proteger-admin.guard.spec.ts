import { TestBed } from '@angular/core/testing';

import { ProtegerAdminGuard } from './proteger-admin.guard';

describe('ProtegerAdminGuard', () => {
  let guard: ProtegerAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProtegerAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
