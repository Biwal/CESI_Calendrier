import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormPromotionComponent } from './form-promotion.component';
import { Promotion } from 'src/app/models/classes/promotion';
import { Pole } from 'src/app/models/classes/pole';
import { PromoScheduler } from 'src/app/models/classes/promo-scheduler';
import { Reservation } from 'src/app/models/classes/reservation';
import { FormCptNameComponent } from 'src/app/components/forms/form-cpt-name/form-cpt-name.component';
import { FormCptSizeComponent } from 'src/app/components/forms/form-cpt-size/form-cpt-size.component';
import { FormCptActiveComponent } from 'src/app/components/forms/form-cpt-active/form-cpt-active.component';
import { FormCptPoleComponent } from 'src/app/components/forms/form-cpt-pole/form-cpt-pole.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FormPromotionComponent', () => {
  let component: FormPromotionComponent;
  let fixture: ComponentFixture<FormPromotionComponent>;
  const fb: FormBuilder = new FormBuilder();
  const mockPromotionData = new Promotion({
    id: 3,
    name: 'AP18',
    size: 4,
    isActive: true,
    pole: new Pole({
      id: 4,
      name: 'informatique',
      color: '#ffb81c',
      promotions: new Array<Promotion>()
    }),
    promoSchedules: new Array<PromoScheduler>(),
    reservations: new Array<Reservation>()
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormPromotionComponent,
        FormCptNameComponent,
        FormCptSizeComponent,
        FormCptActiveComponent,
        FormCptPoleComponent
      ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: FormBuilder, useValue: fb }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPromotionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('FormCptNameComponent should have the same FormGroup as FormPromotionComponent', () => {
    fixture.detectChanges();

    expect(component.FormCptNameComponent.parentForm.getRawValue).toBe(
      component.promotionForm.getRawValue
    );
  });
  it('FormCptSizeComponent should have the same FormGroup as FormPromotionComponent', () => {
    fixture.detectChanges();

    expect(component.FormCptSizeComponent.parentForm.getRawValue).toBe(
      component.promotionForm.getRawValue
    );
  });
  it('FormCptActiveComponent should have the same FormGroup as FormPromotionComponent', () => {
    fixture.detectChanges();

    expect(component.FormCptActiveComponent.parentForm.getRawValue).toBe(
      component.promotionForm.getRawValue
    );
  });
  it('FormCptPoleComponent should have the same FormGroup as FormPromotionComponent', () => {
    fixture.detectChanges();

    expect(component.FormCptPoleComponent.parentForm.getRawValue).toBe(
      component.promotionForm.getRawValue
    );
  });

  describe('ngAfterContentInit()', () => {
    it('initAddForm() should return the right promotionGroup', () => {
      fixture.detectChanges();
      const mockForm = fb.group({
        name: [''],
        size: [''],
        active: [''],
        pole: ['']
      });

      const formGroup = component.initAddForm();

      expect(formGroup.value).toEqual(mockForm.value);
    });


  });
});
