import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnGestionAddComponent } from './btn-gestion-add.component';

describe('BtnGestionAddComponent', () => {
  let component: BtnGestionAddComponent;
  let fixture: ComponentFixture<BtnGestionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnGestionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnGestionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
