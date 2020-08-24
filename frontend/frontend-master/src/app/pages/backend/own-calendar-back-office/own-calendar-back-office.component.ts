import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { EventInterface } from '../../../components/own-calendar/own-calendar.component';
import { setTime } from '../../../utils/MomentUtils';
import { ModalService } from 'src/app/services/modal.service';
import { ModalReservationEventComponent } from '../../modal-reservation-event/modal-reservation-event.component';
import { ModalPermuFusionComponent } from '../../modal-permu-fusion/modal-permu-fusion.component';
import { Subscription } from 'rxjs';
import { CalendarService } from '../../../services/api/calendar.service';
import { RoomApiService } from '../../../services/api/room-api.service';
import { Room } from '../../../models/classes/room';
import { ReservationApiService } from 'src/app/services/api/reservation/reservation-api.service';
import { EventApiService } from 'src/app/services/api/event-api.service';

@Component({
  selector: 'app-own-calendar-back-office',
  templateUrl: './own-calendar-back-office.component.html',
  styleUrls: ['./own-calendar-back-office.component.scss']
})
export class OwnCalendarBackOfficeComponent implements OnDestroy {
  private referentDate: Moment;
  private events: EventInterface[];
  private resources: Room[];
  private calendarService: CalendarService;
  private subscription: Subscription;
  private resaSubscription: Subscription;

  constructor(
    private modalService: ModalService,
    roomService: RoomApiService,
    calendarService: CalendarService,
    private reservationService: ReservationApiService,
    private eventService: EventApiService
  ) {
    this.calendarService = calendarService;
    this.referentDate = moment();
    this.reload();
    roomService.getRooms().subscribe((data) => {
      this.resources = data;
    });
  }

  onModal() {
    const inputs = { isMobile: false };
    this.modalService.init(ModalReservationEventComponent, inputs, {});
  }

  nextWeek() {
    this.events = [];
    this.referentDate = moment(this.referentDate).add(1, "weeks");
    this.loadResas();
  }

  lastWeek() {
    this.events = [];
    this.referentDate = moment(this.referentDate).add(-1, "weeks");
    this.loadResas();
  }

  today() {
    this.events = [];
    this.referentDate = moment();
    this.loadResas();
  }

  reload() {
    setInterval(() => {
      this.loadResas();
    }, 5000);
  }

  loadResas() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }

      this.subscription = this.calendarService.getCalendarForWeek(this.referentDate.toDate()).subscribe((data) => {
        if (!this.events || this.events.length !== [...data[0], ...data[1]].length) this.events = [...data[0], ...data[1]];
      });
  }

  onShowEvent(data) {
    if (data.promo) {
      this.resaSubscription = this.reservationService.getOneReservation(data.id).subscribe(reservation => {
        const inputs = { isMobile: false, reservation};
        this.modalService.init(ModalReservationEventComponent, inputs, {});
      });
    } else {
      this.resaSubscription = this.reservationService.getOneReservation(data.id).subscribe(event => {
        const inputs = { isMobile: false, event };
        this.modalService.init(ModalReservationEventComponent, inputs, {});
      });
    }
  }

  onShowModalAction(data) {
    const inputs = { isMobile: false, resas:data };
    this.modalService.init(ModalPermuFusionComponent, inputs, {});
  }

  getWeekDate() {
    return 'Semaine du ' + this.referentDate.clone().startOf('isoWeek').format('DD') + ' au ' + this.referentDate.clone().startOf('isoWeek').add(4, 'days').format('DD MMMM YYYY');
  }

  ngOnDestroy() {
    if (this.resaSubscription) {
      this.resaSubscription.unsubscribe();
    }
  }
}
