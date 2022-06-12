import { TestBed } from '@angular/core/testing';

import { ProtegerVeterinarioGuard } from './proteger-veterinario.guard';

describe('ProtegerVeterinarioGuard', () => {
  let guard: ProtegerVeterinarioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProtegerVeterinarioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
