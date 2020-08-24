import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerWeekComponent } from './datepicker-week.component';

describe('DatepickerWeekComponent', () => {
  let component: DatepickerWeekComponent;
  let fixture: ComponentFixture<DatepickerWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
