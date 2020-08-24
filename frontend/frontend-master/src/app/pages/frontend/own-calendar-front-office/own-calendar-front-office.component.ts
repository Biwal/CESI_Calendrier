import { Component, OnInit } from '@angular/core';
import {EventInterface, ResourceInterface} from '../../../components/own-calendar/own-calendar.component';
import * as moment from 'moment';
import {Moment} from 'moment';
import {RoomApiService} from '../../../services/api/room-api.service';
import {CalendarService} from '../../../services/api/calendar.service';
import {Room} from '../../../models/classes/room';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-own-calendar-front-office',
  templateUrl: './own-calendar-front-office.component.html',
  styleUrls: ['./own-calendar-front-office.component.scss']
})
export class OwnCalendarFrontOfficeComponent implements OnInit {
  private referentDate: Moment;

  private events: EventInterface[];
  private resources: Room[];

  private subscription: Subscription;
  private calendarService: CalendarService;

  constructor(roomService: RoomApiService, calendarService: CalendarService) {
    this.referentDate = moment();
    this.calendarService = calendarService;
    roomService.getRooms().subscribe((data) => {
      this.resources = data;
    });

    this.loadResas(true);
    this.reload();
  }

  ngOnInit() {
  }

  reload() {
    setInterval(() => {
      this.loadResas(true);
    }, 300000);
  }

  loadResas(change = false) {
    if (change) {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }

      this.subscription = this.calendarService.getCalendarForDay(this.referentDate.toDate()).subscribe((data) => {
        this.events = [...data[0], ...data[1]];
      });
    } else {
      this.calendarService.getCalendarForDay(this.referentDate.toDate());
    }
  }

  getDay() {
      return this.referentDate.format('DD MMMM YYYY');
  }
}
