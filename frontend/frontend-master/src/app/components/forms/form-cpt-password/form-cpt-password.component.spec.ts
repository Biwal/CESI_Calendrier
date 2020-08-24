import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCptPasswordComponent } from './form-cpt-password.component';

describe('FormCptPasswordComponent', () => {
  let component: FormCptPasswordComponent;
  let fixture: ComponentFixture<FormCptPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCptPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCptPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
