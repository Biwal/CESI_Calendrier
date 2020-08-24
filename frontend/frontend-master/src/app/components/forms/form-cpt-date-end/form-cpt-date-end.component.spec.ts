import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCptDateEndComponent } from './form-cpt-date-end.component';

describe('FormCptDateEndComponent', () => {
  let component: FormCptDateEndComponent;
  let fixture: ComponentFixture<FormCptDateEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCptDateEndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCptDateEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
