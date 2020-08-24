import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { FormCptRoomComponent } from './form-cpt-room.component';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Room } from 'src/app/models/classes/room';
import { Reservation } from 'src/app/models/classes/reservation';
import { RoomApiService } from 'src/app/services/api/room-api.service';
import { Observable, of } from 'rxjs';

describe('FormCptRoomComponent', () => {
  let component: FormCptRoomComponent;
  let fixture: ComponentFixture<FormCptRoomComponent>;
  let roomService: RoomApiService;
  const formBuilder: FormBuilder = new FormBuilder();
  const mockRoomsData: Room[] = [
    new Room({
      id: 1,
      name: 'Westeros',
      capacity: 18,
      reservations: new Array<Reservation>()
    }),
    new Room({
      id: 2,
      name: 'Raftel',
      capacity: 5,
      reservations: new Array<Reservation>()
    })
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormCptRoomComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        RoomApiService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCptRoomComponent);
    component = fixture.componentInstance;
    component.parentForm = setupFormGroup();
    roomService = TestBed.get(RoomApiService);
    fixture.detectChanges();
  });

  function setupFormGroup(): FormGroup {
    return formBuilder.group({
      room: ['', Validators.required]
    });
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getRoomsList() should return the right roomsList', fakeAsync(() => {
    let result: Room[] = [];
    spyOn(roomService, 'getRooms').and.returnValue(of(mockRoomsData));
    component.ngOnInit();

    component.roomsList$.subscribe((r: Room[]) => {
      result = r;
    });
    tick();
    fixture.detectChanges();

    expect(result).toBe(mockRoomsData);
    expect(roomService.getRooms).toHaveBeenCalledTimes(1);
  }));

  describe('Field room', () => {
    it('should be invalid when value is not set', () => {
      const room = component.parentForm.controls.room;
      const errors = room.errors || {};
      expect(errors.required).toBeTruthy();
    });

    it('should be invalid when value = error',()=>{
      const room = component.parentForm.controls.room;
      room.setValue('error');
      const errors = room.errors || {};
      expect({}).toBeTruthy();
    })

    it('should be valid when value = mockRoomData', () => {
      const room = component.parentForm.controls.room;
      room.setValue(mockRoomsData[1]);
      const errors = room.errors || {};
      expect(errors.required).toBeFalsy();
    });
  });
});
