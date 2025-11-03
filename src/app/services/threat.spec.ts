import { TestBed } from '@angular/core/testing';

import { Threat } from './threat';

describe('Threat', () => {
  let service: Threat;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Threat);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
