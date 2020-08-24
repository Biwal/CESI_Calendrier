import {
  Component,
  AfterContentInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationApiService } from 'src/app/services/api/reservation/reservation-api.service';
import { Reservation } from 'src/app/models/classes/reservation';
import { EventApiService } from 'src/app/services/api/event-api.service';
import { Event } from 'src/app/models/classes/event';
import * as moment from 'moment';
import {ConfigService} from "../../services/api/config/config.service";
import {Config} from "../../models/classes/config";

@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrls: ['./form-event.component.scss']
})
export class FormEventComponent implements AfterContentInit {
  @Input() event: Event;
  @Input() reservation: Reservation;
  @Input() isPerso: boolean;
  eventForm: FormGroup;
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() errorRaised = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private reservationApiService: ReservationApiService,
    private eventApiService: EventApiService, configService: ConfigService
  ) {
    configService.getConfig().subscribe((data) => {
      if(!this.reservation) this.eventForm.controls.color.setValue(data.defaultEventColor);
    });
  }

  ngAfterContentInit() {
    this.eventForm = this.reservation
      ? this.initUpdateForm(this.reservation)
      : this.initAddForm();
  }

  initAddForm(): FormGroup {
    return this.fb.group({
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
      room: ['', Validators.required],
      name: ['', Validators.required],
      private: [this.isPerso, Validators.required],
      color: [''],
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

  initUpdateForm(reservation: Reservation): FormGroup {
    return this.fb.group({
      dateStart: [reservation.getDateStart, Validators.required],
      dateEnd: [reservation.getDateEnd, Validators.required],
      room: [reservation.getRoom, Validators.required],
      name: [reservation.getEvent.getName, Validators.required],
      private: [reservation.getEvent.getPrivate, Validators.required],
      color: [reservation.getEvent.getColor],
      capacity: [
        reservation.getEvent.getCapacity,
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(100),
          Validators.pattern('\\d*')
        ])
      ]
    });
  }

  // onSaveEvent() {
  //   if (this.eventForm.invalid) {
  //     return;
  //   }
  //   this.event ? this.updateEvent() : this.addEvent();
  // }

  onDeleteEvent() {
    this.reservationApiService
      .deleteReservation(this.reservation.getId)
      .subscribe(data => {
        this.formSubmitted.emit({
          message: 'La réservation a été supprimée'
        });
      });
    /* TODO : Close modal */
  }

  onSaveEvent() {
    if (this.eventForm.invalid) {
      return;
    }
    this.reservation ? this.updateEvent() : this.addEvent();
  }

  addEvent() {
    this.eventForm.value.event = this.getEventData();
    this.reservationApiService.checkReservation(this.eventForm.value).subscribe(
      (data: any) => {
        if (data.success) {
          this.addReservation();
          /*this.formSubmitted.emit(true);
            this.reservationForm = this.initAddForm();*/
        } else if (data.fusionPossible) {
          // TODO : ADD MODAL FUSION ICI
        } else {
          this.errorRaised.emit({
            error: null,
            message: data.log
          });
        }
      },
      error => {
        this.errorRaised.emit({
          error
        });
      }
    );
  }

  private addReservation() {
    const reservationTmp = new Reservation(this.getReservationData());
    this.reservationApiService.add(reservationTmp).subscribe(
      (reservationData: Reservation) => {
        this.formSubmitted.emit({
          message: 'L\'évènement a été ajouté'
        });
        this.eventForm = this.initAddForm();
      },
      error => {
        console.error(error);
        this.errorRaised.emit(error);
      }
    );
  }

  private updateReservation() {
    const reservationTmp = new Reservation(this.getReservationData());
    this.reservationApiService
      .updateReservation(reservationTmp, reservationTmp.getId)
      .subscribe(
        (reservation: Reservation) => {
          this.formSubmitted.emit({
            message: 'L\'evènement a été modifié'
          });
          this.eventForm = this.initAddForm();
        },
        error => console.error(error)
      );
  }

  updateEvent() {
    this.eventForm.value.event = this.getEventData();
    this.reservationApiService
      .checkReservation(new Reservation(this.getReservationData()))
      .subscribe(
        (data: any) => {
          if (data.success) {
            this.updateReservation();
          } else if (data.fusionPossible) {
            // TODO : ADD MODAL FUSION ICI
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

  getEventData() {
    return {
      color: this.eventForm.controls.color
        ? this.eventForm.controls.color.value
        : undefined,
      name: this.eventForm.controls.name.value,
      capacity: this.eventForm.controls.capacity.value,
      private: this.eventForm.controls.private.value,
      id: this.reservation ? this.reservation.getEvent.getId : undefined
    };
  }

  getReservationData() {
    return {
      id: this.reservation ? this.reservation.getId : undefined,
      dateStart: moment(
        this.eventForm.controls.dateStart.value,
        'YYYY-MM-DDTHH:mm:ss'
      ).format('YYYY-MM-DDTHH:mm:ss'),
      dateEnd: moment(
        this.eventForm.controls.dateEnd.value,
        'YYYY-MM-DDTHH:mm:ss'
      ).format('YYYY-MM-DDTHH:mm:ss'),
      room: this.eventForm.controls.room.value,
      event: this.getEventData()
    };
  }


}
