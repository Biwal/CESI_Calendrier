import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCptPromotionComponent } from './form-cpt-promotion.component';

describe('FormCptPromotionComponent', () => {
  let component: FormCptPromotionComponent;
  let fixture: ComponentFixture<FormCptPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCptPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCptPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
