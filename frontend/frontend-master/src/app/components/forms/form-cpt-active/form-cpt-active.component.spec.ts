import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCptActiveComponent } from './form-cpt-active.component';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FormCptActiveComponent', () => {
  let component: FormCptActiveComponent;
  let fixture: ComponentFixture<FormCptActiveComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCptActiveComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: FormBuilder, useValue: formBuilder }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCptActiveComponent);
    component = fixture.componentInstance;
    component.parentForm = setupFormGroup();
    fixture.detectChanges();
  });

  function setupFormGroup(): FormGroup {
    return formBuilder.group({
      active: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
