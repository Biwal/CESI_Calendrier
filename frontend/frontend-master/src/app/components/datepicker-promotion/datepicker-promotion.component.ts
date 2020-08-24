import {Component, OnInit } from '@angular/core';
import {DatepickerWeekComponent} from '../datepicker/datepicker-week/datepicker-week.component';
import {Moment} from 'moment';
import {PromoScheduler} from '../../models/classes/promo-scheduler';

@Component({
  selector: 'app-datepicker-promotion',
  templateUrl: '../datepicker/datepicker.component.html',
  styleUrls: ['../datepicker/datepicker.component.scss']
})
export class DatepickerPromotionComponent extends DatepickerWeekComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }


  addDate(date: Moment) {
    const week = this.exists(date);
    if (week !== undefined) {
      week.action = true;
    } else {
      const dateStart: Moment = date.startOf('week');
      const dateEnd: Moment = dateStart.clone().add(4, 'days');

      this.listWeeks.push(new PromoScheduler(
    {
            dateStart: dateStart.format('Y-MM-DDTHH:mm:ss'),
            dateEnd: dateEnd.format('Y-MM-DDT23:59:00'),
            action: true
          }
        ));
    }
  }

  removeDate(date: Moment) {
    const index = this.listWeeks.findIndex((cWeek) => date.isBetween(cWeek.dateStart, cWeek.dateEnd, 'days', '[]'));
    this.listWeeks.splice(index, 1);
  }
}
