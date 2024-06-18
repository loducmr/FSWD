import { TestBed } from '@angular/core/testing';

import { DjangoRestAPIService } from './django-rest-api.service';

describe('DjangoRestAPIService', () => {
  let service: DjangoRestAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DjangoRestAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
