import { TestBed } from '@angular/core/testing';

import { MockBe } from './mock-be';

describe('MockBe', () => {
  let service: MockBe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockBe);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
