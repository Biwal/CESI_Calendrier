import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerDaysOffComponent } from './date-picker-days-off.component';

describe('DatePickerDaysOffComponent', () => {
  let component: DatePickerDaysOffComponent;
  let fixture: ComponentFixture<DatePickerDaysOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePickerDaysOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerDaysOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
