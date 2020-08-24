import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnCalendarFrontOfficeComponent } from './own-calendar-front-office.component';

describe('OwnCalendarFrontOfficeComponent', () => {
  let component: OwnCalendarFrontOfficeComponent;
  let fixture: ComponentFixture<OwnCalendarFrontOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnCalendarFrontOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnCalendarFrontOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
