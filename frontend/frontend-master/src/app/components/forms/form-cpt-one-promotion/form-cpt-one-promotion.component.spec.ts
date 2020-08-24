import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCptOnePromotionComponent } from './form-cpt-one-promotion.component';

describe('FormCptOnePromotionComponent', () => {
  let component: FormCptOnePromotionComponent;
  let fixture: ComponentFixture<FormCptOnePromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCptOnePromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCptOnePromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
