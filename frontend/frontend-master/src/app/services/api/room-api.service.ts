import { Injectable } from '@angular/core';
import { Room } from 'src/app/models/classes/room';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Reservation } from 'src/app/models/classes/reservation';

@Injectable({
  providedIn: 'root'
})
export class RoomApiService {
  constructor(private http: HttpClient) {}
  getRooms() {
    return this.http.get<Room[]>(environment.apiUrl + 'rooms').pipe(
      map((json: Room[]) => {
        return this.mapRooms(json);
      })
    );
  }

  getOneRoom(id: number) {
    return this.http.get<Room>(environment.apiUrl + 'rooms/' + id).pipe(
      map(json => {
        const room = new Room(json);
        return this.mapOneRoom(room);
      })
    );
  }

  mapRooms(json: Room[]): Room[] {
    const rooms = json.map<Room>(data => new Room(data));
    rooms.forEach(element => this.mapOneRoom(element));
    return rooms;
  }

  mapOneRoom(room: Room) {
    room.setReservations(
      room.getReservations.map<Reservation>(data => new Reservation(data))
    );
  }

  addRoom(room: Room) {
    return this.http.post<Room>(environment.apiUrl + 'rooms', room);
  }

  updateRoom(room: Room, id: number) {
    return this.http.put<Room>(environment.apiUrl + 'rooms/' + id, room);
  }

  deleteRoom(id: number) {
    return this.http.delete<Room>(environment.apiUrl + 'rooms/' + id);
  }
}
