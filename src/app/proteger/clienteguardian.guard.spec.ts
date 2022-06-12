import { TestBed } from '@angular/core/testing';

import { ClienteguardianGuard } from './clienteguardian.guard';

describe('ClienteguardianGuard', () => {
  let guard: ClienteguardianGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ClienteguardianGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
