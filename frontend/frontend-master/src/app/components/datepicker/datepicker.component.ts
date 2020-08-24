import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Moment} from 'moment';
import * as moment from 'moment';

export abstract class DatepickerComponent implements OnInit, OnChanges {

  private referentDate: Moment;
  private monthDates: any[];
  private type: string;

  abstract addDate(date: Moment);
  abstract removeDate(date: Moment);
  abstract wasChosen(date: any);

  constructor(type: string) {
    this.type = type;
    this.referentDate = moment().startOf('month');
  }

  nextMonth() {
    this.referentDate.add(1, 'months');
    this.loadDates();
  }

  lastMonth() {
    this.referentDate.add(-1, 'months');
    this.loadDates();
  }

  ngOnInit() {
  }

  getDates() {
    return this.monthDates;
  }

  getDateName() {
    return this.referentDate.format('MMMM') + ' ' + this.referentDate.format('Y');
  }

  protected loadDates() {
    this.monthDates = [];
    const startDay = this.referentDate.clone().startOf('week');
    const endMonth = this.referentDate.clone().endOf('month');
    for (let i = 0; i < 42; i++) {
      const date = startDay.clone().add(i, 'days');
      // tslint:disable-next-line:radix
      const nbrDay = parseInt(date.format('DD'));
      this.monthDates.push({
        date: date.format('YYYY-MM-DD'),
        number: nbrDay,
        chosen: this.wasChosen(date),
        isToday: this.areSame(moment(), date),
        isBefore: date.isBefore(this.referentDate),
        isAfter: date.isAfter(endMonth)
      });
    }
  }

  protected areSame(date1: Moment, date2: Moment) {
    return date1.format('YYYY-MM-DD') === date2.format('YYYY-MM-DD');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadDates();
  }

  choseDate(date: any) {
    if (date.isAfter) {
      this.nextMonth();
      return;
    } else if (date.isBefore) {
      this.lastMonth();
      return;
    }

    const mDate = moment(date.date);
    if (this.wasChosen(mDate)) {
      this.removeDate(mDate);
    } else {
      this.addDate(mDate);
    }

    this.loadDates();
  }
}
