import {
  Component,
  ViewChild,
  Input,
  EventEmitter,
  AfterContentInit,
  Output
} from '@angular/core';
import { FormCptNameComponent } from 'src/app/components/forms/form-cpt-name/form-cpt-name.component';
import { FormCptCapacityComponent } from 'src/app/components/forms/form-cpt-capacity/form-cpt-capacity.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoomApiService } from 'src/app/services/api/room-api.service';
import { Room } from 'src/app/models/classes/room';


@Component({
  selector: 'app-form-room',
  templateUrl: './form-room.component.html',
  styleUrls: ['./form-room.component.scss']
})
export class FormRoomComponent implements AfterContentInit {
  @ViewChild(FormCptNameComponent, { static: false })
  formCptNameComponent: FormCptNameComponent;
  @ViewChild(FormCptCapacityComponent, { static: false })
  formCptCapacityComponent: FormCptCapacityComponent;
  @Input() room: Room;
  roomForm: FormGroup;
  @Output() formCompleted = new EventEmitter<boolean>();
  @Output() errorRaised = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private roomApiService: RoomApiService
  ) {}

  ngAfterContentInit() {
    this.roomForm = this.room
      ? this.initUpdateForm(this.room)
      : this.initAddForm();
  }

  initAddForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      capacity: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(100),
          Validators.pattern('\\d*')
        ])
      ]
    });
  }

  initUpdateForm(room: Room): FormGroup {
    return this.fb.group({
      name: [room.getName, Validators.required],
      capacity: [
        room.getCapacity,
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(100),
          Validators.pattern('\\d*')
        ])
      ]
    });
  }

  onSaveRoom() {
    if (this.roomForm.invalid) {
      return;
    }
    this.room ? this.updateRoom() : this.addRoom();
  }

  addRoom() {
    this.roomApiService.addRoom(this.roomForm.value).subscribe(
      () => {
        this.roomForm = this.initAddForm();
        this.formCompleted.emit(true);
      },
      error => {
        console.error(error);
        this.errorRaised.emit(error);
      }
    );
  }

  updateRoom() {
    this.roomApiService
      .updateRoom(this.roomForm.value, this.room.getId)
      .subscribe(
        () => {
          this.roomForm = this.initAddForm();
          this.formCompleted.emit(false);
        },
        error => {
          console.error(error);
          this.errorRaised.emit(error);
        }
      );
  }
}
