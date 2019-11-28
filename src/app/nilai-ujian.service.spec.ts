import { TestBed } from '@angular/core/testing';

import { NilaiUjianService } from './nilai-ujian.service';

describe('NilaiUjianService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NilaiUjianService = TestBed.get(NilaiUjianService);
    expect(service).toBeTruthy();
  });
});
