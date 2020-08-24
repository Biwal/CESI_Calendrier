import { Component, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Room } from '../../../models/classes/room';
import { RoomApiService } from '../../../services/api/room-api.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent {
  roomsList$: BehaviorSubject<Room[]> = new BehaviorSubject([]);
  @Output() selectRoom = new EventEmitter<Room>();

  constructor(private roomApiService: RoomApiService) {
    this.getRoomsList();
  }

  getRoomsList() {
    this.roomApiService
      .getRooms()
      .subscribe(rooms => this.roomsList$.next(rooms));
  }

  onSelectRoom(value) {
    this.selectRoom.emit(value);
  }

  trackByRoomId(index: number, room: Room) {
    return room ? room.getId : null;
  }
}
