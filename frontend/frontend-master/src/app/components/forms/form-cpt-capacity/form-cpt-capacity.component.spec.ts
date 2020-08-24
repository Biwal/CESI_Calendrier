import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormCptCapacityComponent } from './form-cpt-capacity.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';

describe('FormCptCapacityComponent', () => {
  let component: FormCptCapacityComponent;
  let fixture: ComponentFixture<FormCptCapacityComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormCptCapacityComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: FormBuilder, useValue: formBuilder }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCptCapacityComponent);
    component = fixture.componentInstance;
    component.parentForm = setupFormGroup();
    fixture.detectChanges();
  });

  function setupFormGroup(): FormGroup {
    return formBuilder.group({
      capacity: ['', Validators.compose([
        Validators.required,
        Validators.min(1),
        Validators.max(500),
        Validators.pattern('\\d*')
      ])]
    });
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  function getCapacityFieldErrors(value) {
    const capacity = component.parentForm.controls.capacity;
    capacity.setValue(value);
    return capacity.errors || {};
  }

  it('Capacity field should throw required error when value is not set', () => {
    const errors = getCapacityFieldErrors('');
    expect(errors.required).toBeTruthy();
  });

  it('Capacity field should throw min error when value = 0', () => {
    const errors = getCapacityFieldErrors('0');
    expect(errors.min).toBeTruthy();
  });

  it('Capacity field should throw min error when value = -400', () => {
    const errors = getCapacityFieldErrors('-400');
    expect(errors.min).toBeTruthy();
  });

  it('Capacity field should throw max error when value = 501', () => {
    const errors = getCapacityFieldErrors('501');
    expect(errors.max).toBeTruthy();
  });

  it('Capacity field should throw pattern error when value = 4.5', () => {
    const errors = getCapacityFieldErrors('4.5');
    expect(errors.pattern).toBeTruthy();
  });

  it('Capacity field should throw pattern error when value = 4,5', () => {
    const errors = getCapacityFieldErrors('4,5');
    expect(errors.pattern).toBeTruthy();
  });

  it('Capacity field should throw pattern error when value = 2e', () => {
    const errors = getCapacityFieldErrors('2e');
    expect(errors.pattern).toBeTruthy();
  });

  it('Capacity field should be valid when value = 1', () => {
    const errors = getCapacityFieldErrors(1);
    expect(errors.pattern).toBeFalsy();
    expect(errors.min).toBeFalsy();
    expect(errors.max).toBeFalsy();
    expect(errors.required).toBeFalsy();
  });

  it('Capacity field should be valid when value = 30', () => {
    const errors = getCapacityFieldErrors(30);
    expect(errors.pattern).toBeFalsy();
    expect(errors.min).toBeFalsy();
    expect(errors.max).toBeFalsy();
    expect(errors.required).toBeFalsy();
  });
});
