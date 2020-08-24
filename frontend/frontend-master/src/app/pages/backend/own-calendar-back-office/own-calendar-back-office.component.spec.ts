import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnCalendarBackOfficeComponent } from './own-calendar-back-office.component';

describe('OwnCalendarBackOfficeComponent', () => {
  let component: OwnCalendarBackOfficeComponent;
  let fixture: ComponentFixture<OwnCalendarBackOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnCalendarBackOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnCalendarBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
