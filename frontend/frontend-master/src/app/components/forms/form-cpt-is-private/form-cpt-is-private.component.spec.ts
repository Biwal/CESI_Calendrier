import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCptIsPrivateComponent } from './form-cpt-is-private.component';

describe('FormCptIsPrivateComponent', () => {
  let component: FormCptIsPrivateComponent;
  let fixture: ComponentFixture<FormCptIsPrivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCptIsPrivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCptIsPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
