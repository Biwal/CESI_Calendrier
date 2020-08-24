import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCptUsernameComponent } from './form-cpt-username.component';

describe('FormCptUsernameComponent', () => {
  let component: FormCptUsernameComponent;
  let fixture: ComponentFixture<FormCptUsernameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCptUsernameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCptUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
