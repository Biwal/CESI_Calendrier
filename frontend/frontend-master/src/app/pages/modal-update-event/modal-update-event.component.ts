import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertFormComponent } from 'src/app/components/alert/alert-form/alert-form.component';

@Component({
  selector: 'app-modal-update-event',
  templateUrl: './modal-update-event.component.html',
  styleUrls: ['./modal-update-event.component.scss']
})
export class ModalUpdateEventComponent  {
  isPerso = false;
  isReservation = true;
  @ViewChild(AlertFormComponent, { static: false })
  alertFormComponent: AlertFormComponent;

  onIsPerso(event) {
    this.isPerso = event;
  }

  onIsReservation(event) {
    this.isReservation = event;
  }

  displaySuccessAlert(wasAdded: boolean, message?: string) {
    // tslint:disable-next-line:max-line-length
    this.alertFormComponent.displayAlert('success', message ? message : wasAdded ? 'La réservation a été ajoutée' : 'La réservation a été modifiée');
  }

  displayFailAlert(error) {
    this.alertFormComponent.displayAlert('error', error.statusText);
  }

}
