import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcRegistrationFormComponent } from './pc-registration-form.component';

describe('PcRegistrationFormComponent', () => {
  let component: PcRegistrationFormComponent;
  let fixture: ComponentFixture<PcRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcRegistrationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PcRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
