import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePoleComponent } from './page-pole.component';

describe('PagePoleComponent', () => {
  let component: PagePoleComponent;
  let fixture: ComponentFixture<PagePoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
