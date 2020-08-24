import {OwnCalendarTypeInterface} from '../OwnCalendarTypeInterface';
import CellRow from '../CellRow';
import {setTime} from '../../../utils/MomentUtils';
import {Moment} from 'moment';
import {ConfigInterface, ResourceInterface} from '../own-calendar.component';
import IntervalResource from '../IntervalResource';

export class OwnCalendarWeekType implements OwnCalendarTypeInterface {
  name: string;

  generateCellRows(referentDate: Moment, config: ConfigInterface, resources: ResourceInterface[]): CellRow[] {
    const cellRows: CellRow[] = [];

    for (let i = 0; i < config.weekView.days; i++) {
      const morningStart = setTime(referentDate.clone(), config.morning.start);
      const morningEnd = setTime(referentDate.clone(), config.morning.end);

      const afternoonStart = setTime(referentDate.clone(), config.afternoon.start);
      const afternoonEnd = setTime(referentDate.clone(), config.afternoon.end);

      const cellRowMorning = new CellRow(morningStart, morningEnd, true);
      cellRowMorning.tds = this.getTdsFor(morningStart, morningEnd, cellRowMorning, true, resources);

      const cellRowAfternoon = new CellRow(afternoonStart, afternoonEnd, false);
      cellRowAfternoon.tds = this.getTdsFor(morningStart, morningEnd, cellRowAfternoon, false, resources);

      cellRows.push(cellRowMorning);
      cellRows.push(cellRowAfternoon);

      referentDate.add(1, 'days');
    }

    return cellRows;
  }

  private getTdsFor(dateStart: Moment, dateEnd: Moment, cellRow: CellRow, morning: boolean, resources: ResourceInterface[]): IntervalResource[] {
    const dayCell = new IntervalResource(cellRow, '', true, true, morning ? this.capitalize(dateStart.format('dddd')) : 'false');

    const cellHeaders = [];
    if (morning) { cellHeaders.push(dayCell); }

    cellHeaders.push(new IntervalResource(cellRow, '', true, false, morning ? 'Matin' : 'Après-midi'));

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
