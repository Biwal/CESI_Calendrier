import { Component, OnInit } from '@angular/core';
import {ConfigInterface, OwnCalendarComponent, ResourceInterface} from '../own-calendar.component';
import CellRow from '../CellRow';
import {getMinutesDiff, getTimeIntervalInMinutes, setTime} from '../../../utils/MomentUtils';
import IntervalResource from '../IntervalResource';
import {Moment} from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-own-calendar-day',
  templateUrl: './own-calendar-day.component.html',
  styleUrls: ['./own-calendar-day.component.scss']
})
export class OwnCalendarDayComponent extends OwnCalendarComponent implements OnInit {

  constructor() {
    const config = {
      rowHeight: 32,
      weekView: {
        days: 5,
      },
      morning: {
        start: '08:30:00',
        end: '12:30:00'
      },
      afternoon: {
        start: '12:30:00',
        end: '18:00:00'
      }
    };

    super('OneDayView', config);
  }

  ngOnInit() {
    super.loadCalendarData();
  }

  protected generateCellRows(referentDate: Moment, config: ConfigInterface, resources: ResourceInterface[]): CellRow[] {
    const cellRows: CellRow[] = [];

    // tslint:disable-next-line:max-line-length
    for (let i = 0; i < Math.round(getTimeIntervalInMinutes(setTime(moment(), config.morning.start), setTime(moment(), config.afternoon.end)) / 30); i++) {
      referentDate = setTime(referentDate, config.morning.start);
      const date = referentDate.clone().add((30 * i), 'minutes');
      const endDate = date.clone().add(30, 'minutes');

      const row = new CellRow(date, endDate, false);
      row.tds = this.getTdsFor(date, endDate, row, resources);

      cellRows.push(row);
    }

    return cellRows;
  }

  protected getDiffPercentage(morning, diff) {
    return getMinutesDiff(diff) * this.config.rowHeight / 30;
  }

  private getTdsFor(dateStart: Moment, dateEnd: Moment, cellRow: CellRow, resources: ResourceInterface[]): IntervalResource[] {
    const cellHeaders = [];
    cellHeaders.push(new IntervalResource(cellRow, '', true, false, dateStart.format('HH:mm') + ' ' + dateEnd.format('HH:mm')));

    for (const resource of resources) {
      cellHeaders.push(new IntervalResource(cellRow, resource.name));
    }

    return cellHeaders;
  }
}
