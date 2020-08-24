import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarFormReservationComponent } from './navbar-form-reservation.component';

describe('NavbarFormReservationComponent', () => {
  let component: NavbarFormReservationComponent;
  let fixture: ComponentFixture<NavbarFormReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarFormReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarFormReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
