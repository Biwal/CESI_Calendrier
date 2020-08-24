import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCptDateStartComponent } from './form-cpt-date-start.component';

describe('FormCptDateStartComponent', () => {
  let component: FormCptDateStartComponent;
  let fixture: ComponentFixture<FormCptDateStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCptDateStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCptDateStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
