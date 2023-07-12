import { TestBed } from '@angular/core/testing';

import { TomtomService } from './tomtom.service';

describe('TomtomService', () => {
  let service: TomtomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TomtomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
