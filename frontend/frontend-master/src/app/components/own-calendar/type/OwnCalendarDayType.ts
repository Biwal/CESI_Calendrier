import {OwnCalendarTypeInterface} from '../OwnCalendarTypeInterface';
import CellRow from '../CellRow';
import {getTimeIntervalInMinutes, setTime} from '../../../utils/MomentUtils';
import {Moment} from 'moment';
import {ConfigInterface, ResourceInterface} from '../own-calendar.component';
import IntervalResource from '../IntervalResource';
import * as moment from 'moment';

export class OwnCalendarDayType implements OwnCalendarTypeInterface {
  name: string;

  generateCellRows(referentDate: Moment, config: ConfigInterface, resources: ResourceInterface[]): CellRow[] {
    const cellRows: CellRow[] = [];

    for (let i = 0; i < (Math.round(getTimeIntervalInMinutes(setTime(moment(), config.morning.start), setTime(moment(), config.afternoon.end)) / 30) + 1); i++) {
      referentDate = setTime(referentDate, config.morning.start);
      const date = referentDate.clone().add((30 * i), 'minutes');
      const endDate = date.clone().add(30, 'minutes');

      const row = new CellRow(date, endDate, true);
      row.tds = this.getTdsFor(date, endDate, row, resources);

      cellRows.push(row);

      referentDate.add(1, 'days');
    }

    return cellRows;
  }

  private getTdsFor(dateStart: Moment, dateEnd: Moment, cellRow: CellRow, resources: ResourceInterface[]): IntervalResource[] {
    const cellHeaders = [];
    cellHeaders.push(new IntervalResource(cellRow, '', true, false, dateStart.format('HH:mm') + ' ' + dateEnd.format('HH:mm')));

    for (const resource of resources) {
      cellHeaders.push(new IntervalResource(cellRow, resource.name));
    }

    return cellHeaders;
  }

  private capitalize(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}
