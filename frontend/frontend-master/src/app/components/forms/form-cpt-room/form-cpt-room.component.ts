import { Component, Input, OnInit } from '@angular/core';
import { RoomApiService } from 'src/app/services/api/room-api.service';
import { FormGroup } from '@angular/forms';
import { Room } from 'src/app/models/classes/room';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-cpt-room',
  templateUrl: './form-cpt-room.component.html',
  styleUrls: ['./form-cpt-room.component.scss']
})
export class FormCptRoomComponent implements OnInit {
  @Input() parentForm: FormGroup;
  roomsList$: Observable<Room[]>;
  constructor(private roomApiService: RoomApiService) {}

  ngOnInit() {
    this.roomsList$ = this.roomApiService.getRooms();
  }

  compareFn(optOne, optTwo) {
    return optOne.getName === optTwo.getName;
  }
}
