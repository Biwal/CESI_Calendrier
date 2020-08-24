import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormPoleComponent } from './form-pole.component';
import { FormCptNameComponent } from 'src/app/components/forms/form-cpt-name/form-cpt-name.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FormCptColorComponent } from 'src/app/components/forms/form-cpt-color/form-cpt-color.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Pole } from 'src/app/models/classes/pole';
import { Promotion } from 'src/app/models/classes/promotion';

describe('FormPoleComponent', () => {
  let component: FormPoleComponent;
  let fixture: ComponentFixture<FormPoleComponent>;
  const fb: FormBuilder = new FormBuilder();
  const mockPoleData = new Pole({
    id: 4,
    name: 'informatique',
    color: '#ffb81c',
    promotions: new Array<Promotion>()
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormPoleComponent,
        FormCptNameComponent,
        FormCptColorComponent
      ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: FormBuilder, useValue: fb }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPoleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('FormCptNameComponent should have the same FormGroup as FormPoleAddComponent', () => {
    fixture.detectChanges();

    expect(component.formCptNameComponent.parentForm.getRawValue).toBe(
      component.poleForm.getRawValue
    );
  });

  it('FormCptColorComponent should have the same FormGroup as FormPoleAddComponent', () => {
    fixture.detectChanges();

    expect(component.formCptColorComponent.parentForm.getRawValue).toBe(
      component.poleForm.getRawValue
    );
  });

  describe('ngAfterContentInit()', () => {
    it('initAddForm() should return the right poleGroup', () => {
      fixture.detectChanges();

      const formGroup = component.initAddForm();
      const mockForm = fb.group({
        name: [''],
        color: ['']
      });

      expect(mockForm.value).toEqual(formGroup.value);
    });

    it('initUpdateForm(pole: Pole) should return the right poleGroup', () => {
      component.pole = mockPoleData;
      fixture.detectChanges();

      const formGroup = component.initUpdateForm(component.pole);
      const mockForm = fb.group({
        name: [component.pole.getName],
        color: [component.pole.getColor]
      });

      expect(mockForm.value).toEqual(formGroup.value);
    });

    it('should call initAddForm() when pole is absent', () => {
      fixture.detectChanges();
      spyOn(component, 'initAddForm');
      spyOn(component, 'initUpdateForm');

      component.ngAfterContentInit();

      expect(component.initAddForm).toHaveBeenCalledTimes(1);
      expect(component.initUpdateForm).toHaveBeenCalledTimes(0);
    });

    it('should call initUpdateForm(pole: Pole) when pole is present', () => {
      component.pole = mockPoleData;
      fixture.detectChanges();
      spyOn(component, 'initAddForm');
      spyOn(component, 'initUpdateForm');

      component.ngAfterContentInit();

      expect(component.initAddForm).toHaveBeenCalledTimes(0);
      expect(component.initUpdateForm).toHaveBeenCalledTimes(1);
    });
  });

  describe('onSavePole()', () => {
    it('should not call addPole  or updatePole() if poleForm is invalid', () => {
      fixture.detectChanges();
      spyOn(component, 'addPole');
      spyOn(component, 'updatePole');

      component.onSavePole();

      expect(component.addPole).toHaveBeenCalledTimes(0);
      expect(component.updatePole).toHaveBeenCalledTimes(0);
    });

    it('should call addPole() if poleForm is valid and pole is absent', () => {
      fixture.detectChanges();
      spyOn(component, 'addPole');
      spyOn(component, 'updatePole');
      component.poleForm.controls.name.setValue('Westeros');
      component.poleForm.controls.color.setValue('#ffb81c');

      component.onSavePole();

      expect(component.addPole).toHaveBeenCalledTimes(1);
      expect(component.updatePole).toHaveBeenCalledTimes(0);
    });

    it('should call updatePole() if poleForm is valid and pole is present', () => {
      component.pole = mockPoleData;
      fixture.detectChanges();
      spyOn(component, 'addPole');
      spyOn(component, 'updatePole');

      component.onSavePole();

      expect(component.addPole).toHaveBeenCalledTimes(0);
      expect(component.updatePole).toHaveBeenCalledTimes(1);
    });

    it('should be call by the submit button ', () => {
      fixture.detectChanges();
      spyOn(component, 'onSavePole');
      const el = fixture.debugElement.query(By.css('button[type="submit"]'))
        .nativeElement;
      el.click();
      expect(component.onSavePole).toHaveBeenCalledTimes(1);
    });
  });

  describe('poleForm', () => {
    it('should be invalid when untouched if pole is absent', () => {
      fixture.detectChanges();

      expect(component.poleForm.valid).toBeFalsy();
    });

    it('should be valid when untouched if pole is present', () => {
      component.pole = mockPoleData;
      fixture.detectChanges();

      expect(component.poleForm.valid).toBeTruthy();
    });

    it('should be invalid when name is not set', () => {
      fixture.detectChanges();

      component.poleForm.controls.color.setValue('#ffb81c');

      expect(component.poleForm.valid).toBeFalsy();
    });

    it('should be invalid when color is not set', () => {
      fixture.detectChanges();

      component.poleForm.controls.name.setValue('Informatique');

      expect(component.poleForm.valid).toBeFalsy();
    });

    it('should be valid when name = hello and color = #ffb81c', () => {
      fixture.detectChanges();
      const poleForm = component.poleForm;

      expect(poleForm.valid).toBeFalsy();
      poleForm.controls.name.setValue('hello');
      poleForm.controls.color.setValue('#ffb81c');

      expect(poleForm.valid).toBeTruthy();
    });

    it('should be valid when name = hello and color = rgb(10,0,255)', () => {
      fixture.detectChanges();
      const poleForm = component.poleForm;

      expect(poleForm.valid).toBeFalsy();
      poleForm.controls.name.setValue('hello');
      poleForm.controls.color.setValue('rgb(10,0,255)');

      expect(poleForm.valid).toBeTruthy();
    });

    it('should be valid when name = hello and color = rgba(10,0,255,0.3)', () => {
      fixture.detectChanges();
      const poleForm = component.poleForm;

      expect(poleForm.valid).toBeFalsy();
      poleForm.controls.name.setValue('hello');
      poleForm.controls.color.setValue('rgba(10,0,255,0.3)');

      expect(poleForm.valid).toBeTruthy();
    });
  });
});
