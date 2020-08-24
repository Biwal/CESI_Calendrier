import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReservationEventComponent } from './modal-reservation-event.component';

describe('ModalReservationEventComponent', () => {
  let component: ModalReservationEventComponent;
  let fixture: ComponentFixture<ModalReservationEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalReservationEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReservationEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
