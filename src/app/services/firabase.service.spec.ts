import { TestBed } from '@angular/core/testing';

import { FirabaseService } from './firabase.service';

describe('FirabaseService', () => {
  let service: FirabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
