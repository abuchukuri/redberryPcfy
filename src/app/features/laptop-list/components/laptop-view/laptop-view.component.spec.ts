import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopViewComponent } from './laptop-view.component';

describe('LaptopViewComponent', () => {
  let component: LaptopViewComponent;
  let fixture: ComponentFixture<LaptopViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LaptopViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LaptopViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
