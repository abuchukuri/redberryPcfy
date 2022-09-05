import { TestBed } from '@angular/core/testing';

import { FormGeneralHelperService } from './form-general-helper.service';

describe('FormGeneralHelperService', () => {
  let service: FormGeneralHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormGeneralHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
