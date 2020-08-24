import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigInterface, EventInterface, OwnCalendarComponent, ResourceInterface} from '../own-calendar.component';
import { Moment } from 'moment';
import CellRow from '../CellRow';
import {getMinutesDiff, setTime} from '../../../utils/MomentUtils';
import IntervalResource from '../IntervalResource';

export interface ActionEventInterface {
  source: EventInterface;
  target: EventInterface;
}

@Component({
  selector: 'app-own-calendar-week',
  templateUrl: './own-calendar-week.component.html',
  styleUrls: ['./own-calendar-week.component.scss']
})
export class OwnCalendarWeekComponent extends OwnCalendarComponent implements OnInit {
  @Output() showEvent: EventEmitter<any>;
  @Output() showModalAction: EventEmitter<ActionEventInterface>;

  private sourceEvent: EventInterface;

  constructor() {
    const config = {
      rowHeight: 60,
      weekView: {
        days: 5,
      },
      morning: {
        start: '08:30',
        end: '12:30'
      },
      afternoon: {
        start: '12:30',
        end: '17:30'
      }
    };

    super('WeekView', config);
    this.showEvent = new EventEmitter();
    this.showModalAction = new EventEmitter();
  }

  ngOnInit() {
    super.loadCalendarData();
  }

  protected generateCellRows(referentDate: Moment, config: ConfigInterface, resources: ResourceInterface[]): CellRow[] {
    const cellRows: CellRow[] = [];

    const refDate = referentDate.startOf('week');

    for (let i = 0; i < config.weekView.days; i++) {
      const morningStart = setTime(refDate.clone(), config.morning.start);
      const morningEnd = setTime(refDate.clone(), config.morning.end);

      const afternoonStart = setTime(refDate.clone(), config.afternoon.start);
      const afternoonEnd = setTime(refDate.clone(), config.afternoon.end);

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

  // tslint:disable-next-line:max-line-length
  private getTdsFor(dateStart: Moment, dateEnd: Moment, cellRow: CellRow, morning: boolean, resources: ResourceInterface[]): IntervalResource[] {
    const dayCell = new IntervalResource(cellRow, '', true, true, morning ? this.capitalize(dateStart.format('dddd')) : 'false');

    const cellHeaders = [];
    cellHeaders.push(dayCell);

    cellHeaders.push(new IntervalResource(cellRow, '', true, false, morning ? 'Matin' : 'Après-midi'));

    for (const resource of resources) {
      cellHeaders.push(new IntervalResource(cellRow, resource.name));
    }

    return cellHeaders;
  }

  protected getDiffPercentage(morning, diff) {
    return getMinutesDiff(diff) * this.config.rowHeight / (morning ? this.minutesStartToEndMorning : this.minutesStartToEndAfternoon);
  }

  public clickEvent(obj) {
    if (this.showEvent) { this.showEvent.emit(obj); }
  }

  onDropEvent(event) {
    if (event.promo) {
      if (this.sourceEvent.name !== event.name && this.showModalAction) this.showModalAction.emit({
        source: this.sourceEvent,
        target: event
      });
    }
  }

  onDragStart($event, event) {
    this.sourceEvent = event;
  }

  onDragOver() {
    return false;
  }
}
