import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopRegistrationFormComponent } from './laptop-registration-form.component';

describe('LaptopRegistrationFormComponent', () => {
  let component: LaptopRegistrationFormComponent;
  let fixture: ComponentFixture<LaptopRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LaptopRegistrationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LaptopRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
