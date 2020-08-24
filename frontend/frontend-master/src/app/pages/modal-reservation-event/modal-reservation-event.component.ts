import { Component, ViewChild, Input } from '@angular/core';
import { AlertFormComponent } from 'src/app/components/alert/alert-form/alert-form.component';
import { Event } from 'src/app/models/classes/event';
import { Reservation } from 'src/app/models/classes/reservation';

@Component({
  selector: 'app-modal-reservation-event',
  templateUrl: './modal-reservation-event.component.html',
  styleUrls: ['./modal-reservation-event.component.scss']
})
export class ModalReservationEventComponent {
  isPerso = false;
  isReservation = true;
  @ViewChild(AlertFormComponent, { static: false })
  alertFormComponent: AlertFormComponent;
  @Input() event: Event;
  @Input() reservation: Reservation;

  onIsPerso(event) {
    this.isPerso = event;
  }

  onIsReservation(event) {
    this.isReservation = event;
  }

  displaySuccessAlert(obj) {
    // tslint:disable-next-line:max-line-length
    this.alertFormComponent.displayAlert('success', obj.message ? obj.message : obj.wasAdded ? 'La réservation a été ajoutée' : 'La réservation a été modifiée');
  }

  displayFailAlert(error) {
    this.alertFormComponent.displayAlert('error', error.message ? error.message : error.error.statusText);
  }
}
