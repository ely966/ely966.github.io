import { TestBed } from '@angular/core/testing';

import { ModalMascotaVerService } from './modal-mascota-ver.service';

describe('ModalMascotaVerService', () => {
  let service: ModalMascotaVerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalMascotaVerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
