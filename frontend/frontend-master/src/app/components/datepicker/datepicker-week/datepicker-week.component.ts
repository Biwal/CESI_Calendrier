import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import { DatepickerComponent } from '../datepicker.component';
import { Moment } from 'moment';
import * as moment from 'moment';

export interface WeekInterface {
  dateStart: Moment|Date;
  dateEnd: Moment|Date;
  action?: boolean;
}

@Component({
  selector: 'app-datepicker-week',
  templateUrl: '../datepicker.component.html',
  styleUrls: ['../datepicker.component.scss']
})
export class DatepickerWeekComponent extends DatepickerComponent implements OnChanges, OnInit {
  @Input() listWeeks: WeekInterface[];

  constructor() {
    super('week');
    if (!this.listWeeks) { this.listWeeks = []; }
  }

  ngOnInit() {
    this.loadDates();
  }

  addDate(date: Moment) {
    const week = this.exists(date);
    if (week !== undefined) {
      week.action = true;
    } else {
      const dateStart = date.startOf('week');
      const dateEnd = dateStart.clone().add(4, 'days');

      this.listWeeks.push(
          {
            dateStart,
            dateEnd,
            action: true
          }
      );
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentList: SimpleChange = changes.listWeeks;

    this.loadDates();
  }

  removeDate(date: Moment) {
      const week = this.listWeeks.filter((cWeek) => date.isBetween(cWeek.dateStart, cWeek.dateEnd, 'days', '[)'))[0];
      week.action = false;
  }

  exists(date: Moment) {
    return this.listWeeks.filter((cWeek) => date.isBetween(cWeek.dateStart, cWeek.dateEnd, 'days', '[)'))[0];
  }

  wasChosen(date: Moment) {
    for (const week of this.listWeeks) {
      // tslint:disable-next-line:max-line-length
      if ((week.action === undefined || week.action) && date.isBetween(moment(week.dateStart, 'YYYY-MM-DDTHH:mm:ss'), moment(week.dateEnd, 'YYYY-MM-DDTHH:mm:ss'), 'days', '[]')) { return true; }
    }

    return false;
  }
}
