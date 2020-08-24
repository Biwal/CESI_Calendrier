import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormCptSizeComponent } from './form-cpt-size.component';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FormCptSizeComponent', () => {
  let component: FormCptSizeComponent;
  let fixture: ComponentFixture<FormCptSizeComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCptSizeComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: FormBuilder, useValue: formBuilder }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCptSizeComponent);
    component = fixture.componentInstance;
    component.parentForm = setupFormGroup();
    fixture.detectChanges();
  });

  function setupFormGroup(): FormGroup {
    return formBuilder.group({
      size: ['', Validators.compose([
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

  function getSizeFieldErrors(value) {
    const size = component.parentForm.controls.size;
    size.setValue(value);
    return size.errors || {};
  }

  it('Size field should throw required error when value is not set', () => {
    const errors = getSizeFieldErrors('');
    expect(errors.required).toBeTruthy();
  });

  it('Size field should throw min error when value = 0', () => {
    const errors = getSizeFieldErrors('0');
    expect(errors.min).toBeTruthy();
  });

  it('Size field should throw min error when value = -400', () => {
    const errors = getSizeFieldErrors('-400');
    expect(errors.min).toBeTruthy();
  });

  it('Size field should throw max error when value = 501', () => {
    const errors = getSizeFieldErrors('501');
    expect(errors.max).toBeTruthy();
  });

  it('Size field should throw pattern error when value = 4.5', () => {
    const errors = getSizeFieldErrors('4.5');
    expect(errors.pattern).toBeTruthy();
  });

  it('Size field should throw pattern error when value = 4,5', () => {
    const errors = getSizeFieldErrors('4,5');
    expect(errors.pattern).toBeTruthy();
  });

  it('Size field should throw pattern error when value = 2e', () => {
    const errors = getSizeFieldErrors('2e');
    expect(errors.pattern).toBeTruthy();
  });

  it('Size field should be valid when value = 1', () => {
    const errors = getSizeFieldErrors(1);
    expect(errors.pattern).toBeFalsy();
    expect(errors.min).toBeFalsy();
    expect(errors.max).toBeFalsy();
    expect(errors.required).toBeFalsy();
  });

  it('Size field should be valid when value = 30', () => {
    const errors = getSizeFieldErrors(30);
    expect(errors.pattern).toBeFalsy();
    expect(errors.min).toBeFalsy();
    expect(errors.max).toBeFalsy();
    expect(errors.required).toBeFalsy();
  });
});
