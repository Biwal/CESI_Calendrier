import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRoomComponent } from './page-room.component';

describe('PageRoomComponent', () => {
  let component: PageRoomComponent;
  let fixture: ComponentFixture<PageRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
