import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnCalendarFrontOfficeWeekComponent } from './own-calendar-front-office-week.component';

describe('OwnCalendarFrontOfficeWeekComponent', () => {
  let component: OwnCalendarFrontOfficeWeekComponent;
  let fixture: ComponentFixture<OwnCalendarFrontOfficeWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnCalendarFrontOfficeWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnCalendarFrontOfficeWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
