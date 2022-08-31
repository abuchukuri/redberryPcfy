import { TestBed } from '@angular/core/testing';

import { FormStateManagerService } from './form-state-manager.service';

describe('FormStateManagerService', () => {
  let service: FormStateManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormStateManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
