import {Component, OnInit } from '@angular/core';
import { PoleApiService } from './services/api/pole-api.service';
import { Room } from './models/classes/room';
import { RoomApiService } from './services/api/room-api.service';
import { ReservationApiService } from './services/api/reservation/reservation-api.service';
import { Reservation } from './models/classes/reservation';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cesi-scheduler-frontend';
  today = new Date();

  private table: Array<number> = [4, 2];
  constructor(
    private poleApi: PoleApiService,
    private fb: FormBuilder,
    private roomApi: RoomApiService,
    private reservationService: ReservationApiService
  ) {}
  i: Room;

  id: number;
  name: string;
  capacity: number;
  reservations: Reservation[] = [];
  mockRoomData: Room;
  mockReservations: Reservation[] = [
    new Reservation({
      dateStart: new Date(),
      dateEnd: new Date(),
      id: 6
    }),
    new Reservation({
      dateStart: new Date(),
      dateEnd: new Date(),
      id: 9
    })
  ];

  ngOnInit() {
    moment.locale('FR_fr');
  }
}
