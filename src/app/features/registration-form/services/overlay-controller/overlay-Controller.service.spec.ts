import { TestBed } from '@angular/core/testing';

import { OverlayControllerServiceService } from './overlay-controller.service';

describe('OverlaycontrollerServiceService', () => {
  let service: OverlayControllerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayControllerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
