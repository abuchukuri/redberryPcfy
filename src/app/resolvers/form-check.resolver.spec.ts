import { TestBed } from '@angular/core/testing';

import { FormCheckResolver } from './form-check.resolver';

describe('FormCheckResolver', () => {
  let resolver: FormCheckResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FormCheckResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
