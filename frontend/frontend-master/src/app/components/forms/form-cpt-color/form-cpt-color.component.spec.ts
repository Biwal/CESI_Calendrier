import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormCptColorComponent } from "./form-cpt-color.component";
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("FormCptColorComponent", () => {
  let component: FormCptColorComponent;
  let fixture: ComponentFixture<FormCptColorComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormCptColorComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: FormBuilder, useValue: formBuilder }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCptColorComponent);
    component = fixture.componentInstance;
    component.parentForm = setUpFormGroup();
    fixture.detectChanges();
  });

  function setUpFormGroup(): FormGroup {
    return formBuilder.group({
      color: [
        "",
        Validators.compose([
          Validators.pattern(
            "^#[a-f0-9]{6}$|^rgba?\\(((25[0-5]|2[0-4]\\d|1\\d{1,2}|\\d\\d?)\\s*,\\s*?){2}(25[0-5]|2[0-4]\\d|1\\d{1,2}|\\d\\d?)\\s*,?\\s*([01]\\.?\\d*?)?\\)$"
          ),
          Validators.required
        ])
      ]
    });
  }

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  function getColorFieldErrors(value: string) {
    const color = component.parentForm.controls.color;
    color.setValue(value);
    return color.errors || {};
  }

  it('Color field should throw required error when value is not set', () => {
    const errors = getColorFieldErrors('');
    expect(errors.required).toBeTruthy();
  });

  it('Color field should throw pattern error when value = 123456', () => {
    const errors = getColorFieldErrors('123456');
    expect(errors.pattern).toBeTruthy();
  });

  it('Color field should throw pattern error when value = #2123456', () => {
    const errors = getColorFieldErrors('#2123456');
    expect(errors.pattern).toBeTruthy();
  });

  it('Color field should throw pattern error when value = #1ag456', () => {
    const errors = getColorFieldErrors('#1ag456');
    expect(errors.pattern).toBeTruthy();
  });

  it('Color field should throw pattern error when value = 1ab456', () => {
    const errors = getColorFieldErrors('1ab456');
    expect(errors.pattern).toBeTruthy();
  });

  it('Color field should throw pattern error when value = rgb(10,10)', () => {
    const errors = getColorFieldErrors('rgb(10,10)');
    expect(errors.pattern).toBeTruthy();
  });

  it('Color field should throw pattern error when value = rgb(10,10,256)', () => {
    const errors = getColorFieldErrors('rgb(10,10,256)');
    expect(errors.pattern).toBeTruthy();
  });

  it('Color field should throw pattern error when value = rgb(1f,2,10)', () => {
    const errors = getColorFieldErrors('rgb(1f,2,10)');
    expect(errors.pattern).toBeTruthy();
  });

  it('Color field should throw pattern error when value = rb(10,10,108)', () => {
    const errors = getColorFieldErrors('rb(10,10,108)');
    expect(errors.pattern).toBeTruthy();
  });

  it('Color field should throw pattern error when value = rgba(10,10,10,0,2)', () => {
    const errors = getColorFieldErrors('rgba(10,10,10,0,2)');
    expect(errors.pattern).toBeTruthy();
  });

  it('Color field should throw pattern error when value = rgba(10,256,10,0.2)', () => {
    const errors = getColorFieldErrors('rgba(10,256,10,0.2)');
    expect(errors.pattern).toBeTruthy();
  });

  it('Color field should throw pattern error when value = rgba(10,10,0.2)', () => {
    const errors = getColorFieldErrors('rgba(10,10,0.2)');
    expect(errors.pattern).toBeTruthy();
  });

  it('Color field should throw pattern error when value = rgba(10,10)', () => {
    const errors = getColorFieldErrors('rgba(10,10)');
    expect(errors.pattern).toBeTruthy();
  });

  it('Color field should be valid when value = #1ba456', () => {
    const errors = getColorFieldErrors('#1ba456');
    expect(errors.pattern).toBeFalsy();
    expect(errors.required).toBeFalsy();
  });

  it('Color field should be valid when value = rgb(255,0,15)', () => {
    const errors = getColorFieldErrors('rgb(255,0,15)');
    expect(errors.pattern).toBeFalsy();
    expect(errors.required).toBeFalsy();
  });

  it('Color field should be valid when value = rgb(255,0,15,0.2)', () => {
    const errors = getColorFieldErrors('rgb(255,0,15,0.2)');
    expect(errors.pattern).toBeFalsy();
    expect(errors.required).toBeFalsy();
  });

  it('Color field should be valid when value = rgba(15,0,255)', () => {
    const errors = getColorFieldErrors('rgba(15,0,255)');
    expect(errors.pattern).toBeFalsy();
    expect(errors.required).toBeFalsy();
  });
});
