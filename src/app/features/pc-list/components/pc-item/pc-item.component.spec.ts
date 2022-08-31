import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcItemComponent } from './pc-item.component';

describe('PcItemComponent', () => {
  let component: PcItemComponent;
  let fixture: ComponentFixture<PcItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PcItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
