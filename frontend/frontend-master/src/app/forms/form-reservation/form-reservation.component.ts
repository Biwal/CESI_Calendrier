import {
  Component,
  OnInit,
  AfterContentInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationApiService } from 'src/app/services/api/reservation/reservation-api.service';
import { Reservation } from 'src/app/models/classes/reservation';
import * as moment from 'moment';
import { ModalService } from 'src/app/services/modal.service';
import { ModalCheckComponent } from 'src/app/components/modal/modal-check/modal-check.component';
import { FormCptDateStartComponent } from 'src/app/components/forms/form-cpt-date-start/form-cpt-date-start.component';
import { FormCptDateEndComponent } from 'src/app/components/forms/form-cpt-date-end/form-cpt-date-end.component';
import { FormCptOnePromotionComponent } from 'src/app/components/forms/form-cpt-one-promotion/form-cpt-one-promotion.component';
import { PromotionApiService } from 'src/app/services/api/promotion-api.service';

@Component({
  selector: 'app-form-reservation',
  templateUrl: './form-reservation.component.html',
  styleUrls: ['./form-reservation.component.scss']
})
export class FormReservationComponent implements AfterContentInit {
  @ViewChild(FormCptDateStartComponent, {static: false})
  formCptDateStartComponent: FormCptDateStartComponent;
  @ViewChild(FormCptDateEndComponent, {static: false})
  formCptDateEndComponent: FormCptDateEndComponent;
  @ViewChild(FormCptOnePromotionComponent, {static: false})
  formCptOnePromotionComponent: FormCptOnePromotionComponent;
  @ViewChild(ModalCheckComponent, {static: false})
  modalCheckComponent: ModalCheckComponent;
  @Input() reservation: Reservation;
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() errorRaised = new EventEmitter<any>();
  reservationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reservationApiService: ReservationApiService,
    private modalService: ModalService,
    private promotionService: PromotionApiService
  ) {}

  ngAfterContentInit() {
    this.reservationForm = this.reservation
      ? this.initUpdateForm(this.reservation)
      : this.initAddForm();
  }

  initAddForm(): FormGroup {
    return this.fb.group({
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
      room: ['', Validators.required],
      promotion: ['', Validators.required]
    });
  }

  initUpdateForm(reservation: Reservation): FormGroup {
    return this.fb.group({
      dateStart: [reservation.getDateStart, Validators.required],
      dateEnd: [reservation.getDateEnd, Validators.required],
      room: [reservation.getRoom, Validators.required],
      promotion: [reservation.getPromotion, Validators.required]
    });
  }

  onSaveReservation() {
    if (this.reservationForm.invalid) {
      return;
    }
    this.reservation ? this.updateReservation() : this.addReservation();
  }

  addReservation(force = false) {
    this.reservationApiService
      .testReservation(new Reservation(this.getReservationData()), force)
      .subscribe(
        (data: any) => {
          console.log(data);
          if (data.success) {
            this.formSubmitted.emit({
              wasAdded: true
            });
          } else if (data.fusionPossible) {
            this.modalCheckComponent.pop('Voulez-vous fusionnez les deux réservations ?');
          } else if (data.alertSize) {
            this.modalCheckComponent.pop('Taille de la salle trop petite, voulez vous forcez ?');
          } else {
            this.errorRaised.emit({
              error: null,
              message: data.log
            });
          }
        },
        error => {
          console.error(error);
          this.errorRaised.emit({
            error
          });
        }
      );
  }

  updateReservation() {
    this.reservationApiService
      .checkReservation(new Reservation(this.getReservationData()))
      .subscribe(
        (data: any) => {
          if (data.success) {
            this.update();
            /*this.formSubmitted.emit(true);
            this.reservationForm = this.initAddForm();*/
            this.formSubmitted.emit(false);
          } else if (data.fusionPossible) {
            this.modalCheckComponent.pop('Voulez-vous fusionnez les deux réservations ?');
          } else if (data.forcePossible) {
            this.modalCheckComponent.pop('Taille de la salle trop petite, voulez vous forcez ?');
          } else {
            this.errorRaised.emit({
              error: null,
              message: data.log
            });
          }
        },
        error => {
          console.error(error);
          this.errorRaised.emit({
            error
          });
        }
      );
  }

  onModal() {
    const inputs = { isMobile: false };
    this.modalService.init(ModalCheckComponent, inputs, {});
  }

  onModificationChange(e) {
    if (e) {
      this.reservation ? this.update() :  this.addReservation(true);
      this.modalCheckComponent.hide();
    } else {
      this.modalCheckComponent.hide();
      this.errorRaised.emit({
        error: null,
        message: 'Fusion refusé'
      });
    }
  }

  private update() {
    const reservationTmp = new Reservation(this.getReservationData());
    this.reservationApiService
      .updateReservation(reservationTmp, reservationTmp.getId)
      .subscribe(
        (reservation: Reservation) => {
          this.formSubmitted.emit({
            message: 'La réservation a été modifiée'
          });
          this.modalService.destroy();
          this.reservationForm = this.initAddForm();
        },
        error => console.error(error)
      );
  }

  private getReservationData() {
    return {
      id: this.reservation ? this.reservation.getId : undefined,
      dateStart: moment(
        this.reservationForm.controls.dateStart.value,
        'YYYY-MM-DDTHH:mm:ss'
      ).format('YYYY-MM-DDTHH:mm:ss'),
      dateEnd: moment(
        this.reservationForm.controls.dateEnd.value,
        'YYYY-MM-DDTHH:mm:ss'
      ).format('YYYY-MM-DDTHH:mm:ss'),
      room: this.reservationForm.controls.room.value,
      promotion: this.reservationForm.controls.promotion.value,
    };
  }

  onDeleteEvent() {
    this.reservationApiService
      .deleteReservation(this.reservation.getId)
      .subscribe(data => {
        this.formSubmitted.emit({
          message: 'La réservation a été supprimée'
        });
        this.modalService.destroy();
      });
  }

  refreshPromosList() {
    const dateStart = this.reservationForm.value.dateStart;
    const dateEnd = this.reservationForm.value.dateEnd;
    if (!dateStart || !dateEnd) {
      return;
    }
    this.formCptOnePromotionComponent.promotionsList$ = this.promotionService.getPromotionsPresentsAtDate(dateStart, dateEnd);
  }
}
