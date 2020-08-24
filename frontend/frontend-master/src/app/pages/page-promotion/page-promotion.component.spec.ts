import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePromotionComponent } from './page-promotion.component';

describe('PagePromotionComponent', () => {
  let component: PagePromotionComponent;
  let fixture: ComponentFixture<PagePromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
