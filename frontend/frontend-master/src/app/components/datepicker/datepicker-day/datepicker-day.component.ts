import {Component, Input, OnInit} from '@angular/core';
import {DatepickerComponent} from '../datepicker.component';
import {Moment} from 'moment';
import * as moment from "moment";

export interface DayInterface {
  date: Moment|Date;
  action?: boolean;
}

@Component({
  selector: 'app-datepicker-day',
  templateUrl: '../datepicker.component.html',
  styleUrls: ['../datepicker.component.scss']
})
export class DatepickerDayComponent extends DatepickerComponent implements OnInit {
  @Input() protected readonly days: DayInterface[];

  constructor() {
    super('day');
    if (!this.days) { this.days = []; }
  }

  ngOnInit() {
    this.loadDates();
  }

  addDate(date: Moment) {
    const day = this.exists(date);

    if (day === undefined) {
      this.days.push({
        date,
        action: true
      });
    } else {
      day.action = true;
    }
  }

  exists(date: Moment) {
      return this.days.filter((cDay) => date.isSame(cDay.date))[0];
  }

  removeDate(date: Moment) {
    const week = this.days.filter((cDay) => date.isSame(cDay.date))[0];
    week.action = false;
  }

  wasChosen(currentDate: Moment): boolean {
    for (const date of this.days) {
      if ((date.action === undefined || date.action) && this.areSame(currentDate, moment(date.date))) { return true; }
    }

    return false;
  }
}
