import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnDateTimePickerComponent } from './own-date-time-picker.component';

describe('OwnDateTimePickerComponent', () => {
  let component: OwnDateTimePickerComponent;
  let fixture: ComponentFixture<OwnDateTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnDateTimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnDateTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
