import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateEventComponent } from './modal-update-event.component';

describe('ModalUpdateEventComponent', () => {
  let component: ModalUpdateEventComponent;
  let fixture: ComponentFixture<ModalUpdateEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUpdateEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpdateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
