import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerPromotionComponent } from './datepicker-promotion.component';

describe('DatepickerPromotionComponent', () => {
  let component: DatepickerPromotionComponent;
  let fixture: ComponentFixture<DatepickerPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
