import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormRoomComponent } from './form-room.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormCptNameComponent } from 'src/app/components/forms/form-cpt-name/form-cpt-name.component';
import { FormCptCapacityComponent } from 'src/app/components/forms/form-cpt-capacity/form-cpt-capacity.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Room } from 'src/app/models/classes/room';
import { By } from '@angular/platform-browser';
import { Reservation } from 'src/app/models/classes/reservation';

describe('FormRoomComponent', () => {
  let component: FormRoomComponent;
  let fixture: ComponentFixture<FormRoomComponent>;
  const fb: FormBuilder = new FormBuilder();

  const mockRoomData = new Room({
    id: 1,
    name: 'Westeros',
    capacity: 18,
    reservations: new Array<Reservation>()
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormRoomComponent,
        FormCptNameComponent,
        FormCptCapacityComponent
      ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: FormBuilder, useValue: fb }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRoomComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('FormCptNameComponent should have the same FormGroup as FormRoomAddComponent', () => {
    fixture.detectChanges();

    expect(component.formCptNameComponent.parentForm.getRawValue).toBe(
      component.roomForm.getRawValue
    );
  });

  it('FormCptCapacityComponent should have the same FormGroup as FormRoomAddComponent', () => {
    fixture.detectChanges();

    expect(component.formCptCapacityComponent.parentForm.getRawValue).toBe(
      component.roomForm.getRawValue
    );
  });

  describe('ngAfterContentInit()', () => {
    it('initUpdateForm(room: Room) should return the right poleGroup', () => {
      component.room = mockRoomData;
      fixture.detectChanges();

      const formGroup = component.initUpdateForm(component.room);
      const mockForm = fb.group({
        name: [component.room.getName],
        capacity: [component.room.getCapacity]
      });
      expect(mockForm.value).toEqual(formGroup.value);
    });

    it('initAddForm() should return the right poleGroup', () => {
      fixture.detectChanges();

      const formGroup = component.initAddForm();
      const mockForm = fb.group({
        name: [''],
        capacity: ['']
      });

      expect(mockForm.value).toEqual(formGroup.value);
    });

    it('should call initAddForm() when room is absent', () => {
      fixture.detectChanges();
      spyOn(component, 'initAddForm');
      spyOn(component, 'initUpdateForm');

      component.ngAfterContentInit();

      expect(component.initAddForm).toHaveBeenCalledTimes(1);
      expect(component.initAddForm).toHaveBeenCalledWith();
      expect(component.initUpdateForm).toHaveBeenCalledTimes(0);
    });

    it('should call initUpdateForm(room: Room) when room is present', () => {
      component.room = mockRoomData;
      fixture.detectChanges();
      spyOn(component, 'initAddForm');
      spyOn(component, 'initUpdateForm');

      component.ngAfterContentInit();

      expect(component.initAddForm).toHaveBeenCalledTimes(0);
      expect(component.initUpdateForm).toHaveBeenCalledTimes(1);
      expect(component.initUpdateForm).toHaveBeenCalledWith(mockRoomData);
    });
  });

  describe('onSaveRoom()', () => {
    it('should not call updateRoom()  or addRoom() if roomForm is invalid', () => {
      component.room = mockRoomData;
      component.ngAfterContentInit();
      fixture.detectChanges();
      spyOn(component, 'updateRoom');
      spyOn(component, 'addRoom');
      component.roomForm.controls.capacity.setValue('0');

      component.onSaveRoom();

      expect(component.updateRoom).toHaveBeenCalledTimes(0);
      expect(component.addRoom).toHaveBeenCalledTimes(0);
    });

    it('should  call updateRoom() if roomForm is valid and room is present', () => {
      component.room = mockRoomData;
      component.room.setId(5);
      component.ngAfterContentInit();
      fixture.detectChanges();
      spyOn(component, 'updateRoom');
      spyOn(component, 'addRoom');

      component.onSaveRoom();

      expect(component.updateRoom).toHaveBeenCalledTimes(1);
      expect(component.addRoom).toHaveBeenCalledTimes(0);
    });

    it('should  call addRoom() if roomForm is valid and room is absent', () => {
      fixture.detectChanges();
      component.ngAfterContentInit();
      const roomForm = component.roomForm;
      roomForm.controls.name.setValue('Hello');
      roomForm.controls.capacity.setValue(5);
      spyOn(component, 'addRoom');
      spyOn(component, 'updateRoom');

      component.onSaveRoom();

      expect(component.updateRoom).toHaveBeenCalledTimes(0);
      expect(component.addRoom).toHaveBeenCalledTimes(1);
    });

    it('should be call by the submit button ', () => {
      fixture.detectChanges();
      spyOn(component, 'onSaveRoom');
      const el = fixture.debugElement.query(By.css('button[type="submit"]'))
        .nativeElement;

      el.click();

      expect(component.onSaveRoom).toHaveBeenCalledTimes(1);
    });
  });

  describe('roomForm', () => {
    it('should be valid when untouched if room is present', () => {
      component.room = mockRoomData;
      component.ngAfterContentInit();
      fixture.detectChanges();

      expect(component.roomForm.valid).toBeTruthy();
    });

    it('should be invalid when untouched if room is absent', () => {
      fixture.detectChanges();

      expect(component.roomForm.valid).toBeFalsy();
    });

    it('should be invalid when name is not set', () => {
      fixture.detectChanges();

      component.roomForm.controls.capacity.setValue(7);

      expect(component.roomForm.valid).toBeFalsy();
    });

    it('should be invalid when capacity is not set', () => {
      fixture.detectChanges();

      component.roomForm.controls.name.setValue('Westeros');

      expect(component.roomForm.valid).toBeFalsy();
    });

    it('roomForm should be valid when name = hello and capacity = 4', () => {
      fixture.detectChanges();
      const roomForm = component.roomForm;

      expect(roomForm.valid).toBeFalsy();
      roomForm.controls.name.setValue('hello');
      roomForm.controls.capacity.setValue('4');

      expect(roomForm.valid).toBeTruthy();
    });
  });
});
