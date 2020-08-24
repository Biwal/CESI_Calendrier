import { Component, OnInit } from '@angular/core';
import {DatepickerDayComponent} from '../datepicker/datepicker-day/datepicker-day.component';
import {ClosureDay} from '../../models/classes/closure-day';
import {Moment} from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-date-picker-days-off',
  templateUrl: '../datepicker/datepicker.component.html',
  styleUrls: ['../datepicker/datepicker.component.scss']
})
export class DatePickerDaysOffComponent extends DatepickerDayComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

  addDate(date: Moment) {
    const day = this.exists(date);

    if (day === undefined) {
      this.days.push(new ClosureDay({
        date: date.format('YYYY-MM-DD'),
        action: true
      }));
    } else {
      day.action = true;
    }
  }

  removeDate(date: Moment) {
    const day = this.days.filter((cDay) => this.areSame(moment(cDay.date), date))[0];
    day.action = false;
  }
}
