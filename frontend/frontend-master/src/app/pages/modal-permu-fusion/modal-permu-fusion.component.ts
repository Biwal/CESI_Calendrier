import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  AfterContentInit,
  AfterViewChecked,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import { ActionEventInterface } from 'src/app/components/own-calendar/own-calendar-week/own-calendar-week.component';
import { Reservation } from 'src/app/models/classes/reservation';
import { ReservationApiService } from 'src/app/services/api/reservation/reservation-api.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { ModalService } from 'src/app/services/modal.service';
import { AlertFormComponent } from 'src/app/components/alert/alert-form/alert-form.component';

@Component({
  selector: 'app-modal-permu-fusion',
  templateUrl: './modal-permu-fusion.component.html',
  styleUrls: ['./modal-permu-fusion.component.scss']
})
export class ModalPermuFusionComponent
  implements OnInit, OnDestroy, AfterViewChecked {
  @Input() resas: ActionEventInterface;
  @ViewChild(AlertFormComponent, { static: false })
  alertFormComponent: AlertFormComponent;
  target: Reservation;
  source: Reservation;
  targetSubscription: Subscription;
  sourceSubscription: Subscription;
  fusionForce = false;
  permutationForce = false;
  fusionPossible = false;
  displayBtn = false;

  constructor(
    private reservationService: ReservationApiService,
    private cd: ChangeDetectorRef,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.targetSubscription = this.reservationService
      .getOneReservation(this.resas.target.id)
      .subscribe(resa => {
        this.target = resa;
      });
    this.sourceSubscription = this.reservationService
      .getOneReservation(this.resas.source.id)
      .subscribe(resa => {
        this.source = resa;
      });
  }

  ngAfterViewChecked() {
    if (!(this.source && this.target)) { return; }

    this.checkFusionPossible();
    this.fusionForce =
      this.source.getPromotion.getSize + this.target.getPromotion.getSize <
      this.target.getRoom.getCapacity
        ? false
        : true;

    if (
      !(
        this.source.getPromotion.getSize < this.target.getRoom.getCapacity &&
        this.target.getPromotion.getSize < this.source.getRoom.getCapacity
      )
    ) {
      this.permutationForce = true;
    }

    this.displayBtn = true;
    this.cd.detectChanges();
  }

  onFusion() {
    const sourceTmp: Reservation = Object.create(this.source);
    sourceTmp.setRoom(this.target.getRoom);
    this.updateReservation(sourceTmp);
    this.alertFormComponent.displayAlert('success', 'La fusion a bien été effectuée');
    this.modalService.destroy();
  }

  onPermutation() {
    const sourceTmp: Reservation = Object.create(this.source);
    const targetTmp: Reservation = Object.create(this.target);
    sourceTmp.setRoom(this.target.getRoom);
    targetTmp.setRoom(this.source.getRoom);
    this.updateReservation(sourceTmp);
    this.updateReservation(targetTmp);
    this.modalService.destroy();
  }

  onCancel() {
    this.modalService.destroy();
  }

  checkFusionPossible() {
    const sourceDateStart = this.source.getDateStart;
    const sourceDateEnd = this.source.getDateEnd;
    const targetDateStart = this.target.getDateStart;
    const targetDateEnd = this.target.getDateEnd;
    if (
      moment(sourceDateStart).isBetween(targetDateStart, targetDateEnd, 'minutes', '[]') ||
      moment(sourceDateEnd).isBetween(targetDateStart, targetDateEnd, 'minutes', '[]')
    ) {
      this.fusionPossible = true;
    }
  }

  displaySuccessAlert() {
    // tslint:disable-next-line:max-line-length
    this.alertFormComponent.displayAlert('success', 'La réservation a été modifiée' );
  }

  displayFailAlert(error) {
    this.alertFormComponent.displayAlert('error', error.message ? error.message : error.error.statusText);
  }


  async updateReservation(reservation: Reservation) {
     this.reservationService.updateReservation(reservation, reservation.getId).subscribe(
       () => {
          this.displaySuccessAlert();
       },
       error => {
         console.error(error);
         this.displayFailAlert(error);
       }
     );
   }
  ngOnDestroy() {
    if (this.targetSubscription) {
      this.targetSubscription.unsubscribe();
    }
    if (this.sourceSubscription) {
      this.sourceSubscription.unsubscribe();
    }
  }
}
