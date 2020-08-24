import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar-form-reservation',
  templateUrl: './navbar-form-reservation.component.html',
  styleUrls: ['./navbar-form-reservation.component.scss']
})
export class NavbarFormReservationComponent {
  reservation = true;
  perso = false;
  @Output() isReservation = new EventEmitter<boolean>();
  @Output() isPerso = new EventEmitter<boolean>();

  onReservation() {
    this.perso = false;
    this.reservation = true;
    this.isPerso.emit(this.perso);
    this.isReservation.emit(this.reservation);
  }
  onEvenement() {
    this.perso = false;
    this.reservation = false;
    this.isPerso.emit(this.perso);
    this.isReservation.emit(this.reservation);
  }

  onPersonnel() {
    this.perso = true;
    this.reservation = false;
    this.isPerso.emit(this.perso);
    this.isReservation.emit(this.reservation);
  }
}
