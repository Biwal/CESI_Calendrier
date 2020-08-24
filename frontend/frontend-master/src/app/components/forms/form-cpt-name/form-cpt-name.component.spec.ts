import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormCptNameComponent } from './form-cpt-name.component';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';

describe('FormCptNameComponent', () => {
  let component: FormCptNameComponent;
  let fixture: ComponentFixture<FormCptNameComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormCptNameComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: FormBuilder, useValue: formBuilder }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCptNameComponent);
    component = fixture.componentInstance;
    component.parentForm = setupFormGroup();
    fixture.detectChanges();
  });

  function setupFormGroup(): FormGroup {
    return formBuilder.group({
      name: ['', Validators.required]
    });
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should throw required error when value is not set', () => {
    const name = component.parentForm.controls.name;
    const errors = name.errors || {};
    expect(errors.required).toBeTruthy();
  });

  it('should be valid when value = Westeros', () => {
    const name = component.parentForm.controls.name;
    name.setValue('Westeros');
    const errors = name.errors || {};
    expect(errors.required).toBeFalsy();
  });
});
