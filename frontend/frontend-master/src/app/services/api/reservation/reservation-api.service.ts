import { Injectable } from '@angular/core';
import { Reservation } from 'src/app/models/classes/reservation';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Room } from 'src/app/models/classes/room';
import { Promotion } from 'src/app/models/classes/promotion';
import { Observable } from 'rxjs';
import { Event } from 'src/app/models/classes/event';

@Injectable({
  providedIn: 'root'
})
export class ReservationApiService {
  constructor(private http: HttpClient) {}

  getReservations() {
    return this.http
      .get<Reservation[]>(environment.apiUrl + 'reservations')
      .pipe(
        map((json: Reservation[]) => {
          return this.mapReservations(json);
        })
      );
  }

  mapReservations(json: Reservation[]): Reservation[] {
    const reservations = json.map<Reservation>(data => new Reservation(data));
    reservations.forEach(element => this.mapOneReservation(element));
    return reservations;
  }

  mapOneReservation(reservation: Reservation): void {
    reservation.setRoom(new Room(reservation.getRoom));
    if (reservation.getPromotion) {
      reservation.setPromotion(new Promotion(reservation.getPromotion));
    }
    if (reservation.getEvent) {
      reservation.setEvent(new Event(reservation.getEvent));
    }
  }

  getOneReservation(id: number): Observable<Reservation> {
    return this.http
      .get<Reservation>(environment.apiUrl + 'reservations/' + id)
      .pipe(
        map(json => {
          const reservation = new Reservation(json);
          this.mapOneReservation(reservation);
          return reservation;
        })
      );
  }

  testReservation(reservation: Reservation, force = false) {
    return this.http.post<Reservation>(
      environment.apiUrl + 'reservation/test',
      {...reservation, force, fusion: force}
    );
  }

  checkReservation(reservation: Reservation) {
    return this.http.post<Reservation>(
      environment.apiUrl + 'reservation/check',
      reservation
    );
  }

  add(reservation: Reservation) {
    return this.http.post<Reservation>(
      environment.apiUrl + 'reservations',
      reservation
    );
  }

  addReservation(reservation: Reservation) {
    return this.http.post<Reservation>(
      environment.apiUrl + 'reservation/add',
      reservation
    );
  }

  updateReservation(reservation: Reservation, id: number) {
    return this.http.put<Reservation>(
      environment.apiUrl + 'reservations/' + id,
      reservation
    );
  }

  deleteReservation(id: number) {
    return this.http.delete<Reservation>(
      environment.apiUrl + 'reservations/' + id
    );
  }
}
