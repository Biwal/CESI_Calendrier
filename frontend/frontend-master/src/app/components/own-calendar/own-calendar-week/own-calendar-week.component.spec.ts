import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnCalendarWeekComponent } from './own-calendar-week.component';

describe('OwnCalendarWeekComponent', () => {
  let component: OwnCalendarWeekComponent;
  let fixture: ComponentFixture<OwnCalendarWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnCalendarWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnCalendarWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
