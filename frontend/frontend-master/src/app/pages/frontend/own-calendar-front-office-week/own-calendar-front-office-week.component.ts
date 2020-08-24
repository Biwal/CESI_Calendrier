import { Component, OnInit } from '@angular/core';
import {EventInterface} from '../../../components/own-calendar/own-calendar.component';
import {Room} from '../../../models/classes/room';
import {CalendarService} from '../../../services/api/calendar.service';
import {Subscription} from 'rxjs';
import {RoomApiService} from '../../../services/api/room-api.service';
import {ReservationApiService} from '../../../services/api/reservation/reservation-api.service';
import {EventApiService} from '../../../services/api/event-api.service';
import {Moment} from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-own-calendar-front-office-week',
  templateUrl: './own-calendar-front-office-week.component.html',
  styleUrls: ['./own-calendar-front-office-week.component.scss']
})
export class OwnCalendarFrontOfficeWeekComponent implements OnInit {
  private referentDate: Moment;
  private events: EventInterface[];
  private resources: Room[];
  private calendarService: CalendarService;
  private subscription: Subscription;
  private resaSubscription: Subscription;

  constructor(roomService: RoomApiService, calendarService: CalendarService,
              private reservationService: ReservationApiService, private eventService: EventApiService) {
    this.calendarService = calendarService;
    this.referentDate = moment();
    this.loadResas(true);
    roomService.getRooms().subscribe((data) => {
      this.resources = data;
    });
  }

  loadResas(change = false) {
    if (change) {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }

      this.subscription = this.calendarService.getCalendarForWeek(this.referentDate.toDate()).subscribe((data) => {
        this.events = [...data[0], ...data[1]];
      });
    } else {
      this.calendarService.getCalendarForWeek(this.referentDate.toDate());
    }
  }

  ngOnInit() {
  }

  getWeekDate() {
    return "Semaine du " + this.referentDate.clone().startOf('isoWeek').format('DD') + ' au ' + this.referentDate.clone().startOf('isoWeek').add(4, 'days').format('DD MMMM YYYY');
  }
}
