import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnGestionDeleteComponent } from './btn-gestion-delete.component';

describe('BtnGestionDeleteComponent', () => {
  let component: BtnGestionDeleteComponent;
  let fixture: ComponentFixture<BtnGestionDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnGestionDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnGestionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
