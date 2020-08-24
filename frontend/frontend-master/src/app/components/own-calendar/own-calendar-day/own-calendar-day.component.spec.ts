import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnCalendarDayComponent } from './own-calendar-day.component';

describe('OwnCalendarDayComponent', () => {
  let component: OwnCalendarDayComponent;
  let fixture: ComponentFixture<OwnCalendarDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnCalendarDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnCalendarDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
