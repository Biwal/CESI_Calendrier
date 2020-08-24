import CellRow from './CellRow';
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {Moment} from 'moment';
import {getFormat, getMinutesDiff, getTimeIntervalInMinutes, setTime} from '../../utils/MomentUtils';
import * as moment from 'moment';
import {Room} from '../../models/classes/room';

export interface ResourceInterface {
  name: string;
}

export interface EventInterface {
  id: number;
  name: string;
  dateStart: Date|string;
  dateEnd: Date|string;
  resource: string;
  promo?: boolean;
  hidden?: boolean;
  color?: string;
  top?: number;
  height?: number;
  hasChild?: boolean;
  hasParent?: boolean;
  private?: boolean;
}
export interface ConfigInterface {
  morning: any;
  afternoon: any;
  rowHeight: number;
  weekView?: any;
}

export abstract class OwnCalendarComponent implements OnChanges {


  protected readonly config: ConfigInterface;
  private cellRows: CellRow[];

  protected minutesStartToEndMorning: number;
  protected minutesStartToEndAfternoon: number;
  private type: string;

  @Input() resources: ResourceInterface[];
  @Input() events: EventInterface[];
  @Input() referentDate: Moment;
  @Input() showPrivate: boolean;

  constructor(type, config: ConfigInterface) {
    this.showPrivate = false;
    this.config = config;
    this.type = type;

    // tslint:disable-next-line:max-line-length max-line-length
    this.minutesStartToEndMorning = getTimeIntervalInMinutes(setTime(moment(), this.config.morning.start), setTime(moment(), this.config.morning.end));
    // tslint:disable-next-line:max-line-length
    this.minutesStartToEndAfternoon = getTimeIntervalInMinutes(setTime(moment(), this.config.afternoon.start), setTime(moment(), this.config.afternoon.end));

    if (!this.referentDate) { this.referentDate = moment().startOf('isoWeek'); }
  }

  protected abstract generateCellRows(referentDate: Moment, config: ConfigInterface, resources: ResourceInterface[]): CellRow[];
  protected abstract getDiffPercentage(minutes, diff);

  private initializeRows() {
    this.cellRows = this.generateCellRows(this.referentDate.clone(), this.config, this.resources);
  }

  private getEventsAt(dateStart: Moment, dateEnd: Moment, resource: string) {
    // tslint:disable-next-line:max-line-length
    return this.events.filter((event) => event.resource === resource && moment(event.dateStart).isBetween(dateStart, dateEnd, 'minutes', '[]'));
  }

  protected getCellHeaders() {
    const cellHeaders = ['', ''];
    if (this.type === 'OneDayView') { cellHeaders.length = 1; }
    for (const resource of this.resources) {
      cellHeaders.push(resource.name);
    }

    return cellHeaders;
  }

  protected getCellRows() {
    return this.cellRows;
  }

  private getGoodClone(events: EventInterface[]) {
      const clone = [...events];
      for (const index in events) {
        const event = events[index];

        const insideEvents = this.getPreciseInsideEvents(events, event);

        if (insideEvents.length > 0) {
          const notSameBeginning = !this.isSame(insideEvents[0].dateStart, event.dateStart);
          const notSameEnd = !this.isSame(insideEvents[0].dateEnd, event.dateEnd);

          if (notSameBeginning || notSameEnd) {
            const cloneEvent: EventInterface = JSON.parse(JSON.stringify(event));
            if (notSameBeginning) { clone.push({...cloneEvent, dateEnd: this.getGoodEndDate(insideEvents[0].dateStart).toDate()}); }
            if (notSameEnd) { clone.push({...cloneEvent, dateStart: insideEvents[0].dateEnd}); }
            clone.push({...cloneEvent, dateStart: insideEvents[0].dateStart, dateEnd: insideEvents[0].dateEnd});

            // tslint:disable-next-line:radix
            clone.splice(parseInt(index), 1);
          }
          // tslint:disable-next-line:no-shadowed-variable
        }
      }

      return clone;
  }

  private perfectDate(date: Date|string) {
    const momentDate = moment(date, 'YYYY-MM-DDTHH:mm:ss');
    const perfectMorning = setTime(momentDate.clone(), this.config.morning.start);
    const perfectAfternoon = setTime(momentDate.clone(), this.config.afternoon.end);

    if (momentDate.isBefore(perfectMorning)) {
      return perfectMorning;
    }
    if (momentDate.isAfter(perfectAfternoon)) { return perfectAfternoon; }
    return momentDate;
  }

  private isSame(date: Date|string, date2: Date|string) {
      return this.perfectDate(date).format('YYYY-MM-DDTHH:mm:ss') === this.perfectDate(date2).format('YYYY-MM-DDTHH:mm:ss');
  }

  private getGoodEndDate(date: Date|string) {
    const momentDate = moment(date, 'YYYY-MM-DDTHH:mm:ss');
    if (momentDate.format('HH:mm:ss').startsWith(this.config.morning.start)) {
        return setTime(momentDate.clone().add(-1, 'days'), this.config.afternoon.end);
    } else { return momentDate; }
  }

  private defineEventDates(events: EventInterface[], cellRows: CellRow[]) {
    // tslint:disable-next-line:forin
    let clone = this.getGoodClone(events);
    for (const cellRowIndex in cellRows) {

      const rowCell = cellRows[cellRowIndex];

      for (const resource of this.resources) {
        const toRemove = [];
        // tslint:disable-next-line:forin
        for (const index in clone) {
          const event = clone[index];

          if (resource.name === event.resource) {
            const momentEventStart = this.perfectDate(event.dateStart);
            const momentEventEnd = this.perfectDate(event.dateEnd);

            const isBetween = momentEventStart.isBetween(rowCell.getDateStart(), rowCell.getDateEnd(), 'minutes', '[)');
            const isBefore = momentEventStart.isBefore(rowCell.getDateStart()) && momentEventEnd.isAfter(rowCell.getDateStart());

            if (isBetween || isBefore) {

              let top = 0, bottom = 0;

              let cells = 1;

              if (isBetween) {
                top = this.getDiffPercentage(rowCell.isMorning(), moment.duration(momentEventStart.diff(rowCell.getDateStart())));
              }

              if (momentEventEnd.isBefore(rowCell.getDateEnd())) {
                bottom = this.getDiffPercentage(rowCell.isMorning(), moment.duration(rowCell.getDateEnd().diff(momentEventEnd)));
              } else {
                // tslint:disable-next-line:radix
                for (let ind = parseInt(cellRowIndex) + 1; ind < cellRows.length; ind++) {
                  const nextCell = cellRows[ind];

                  if (momentEventEnd.isBefore(nextCell.getDateStart())) {
                    break;
                  }
                  cells++;
                  if (momentEventEnd.isBetween(nextCell.getDateStart(), nextCell.getDateEnd(), null, '[]')) {
                    bottom = this.getDiffPercentage(nextCell.isMorning(), moment.duration(nextCell.getDateEnd().diff(momentEventEnd)));
                    break;
                  }
                }
              }
              // tslint:disable-next-line:radix

              const height = (this.config.rowHeight * cells) - top - bottom;

              // tslint:disable-next-line:radix
              event.top = top;
              event.height = height;
              const insideEvents = this.getInsideEvents(clone, event);
              if (insideEvents.length > 0) {
                // tslint:disable-next-line:no-shadowed-variable
                insideEvents.forEach((event) => {
                  if (!event.hasChild) { event.hasParent = true; }
                });
                event.hasChild = true;
              }

              cellRows[cellRowIndex].getTdWithResource(resource.name).addEvent(event);
              // tslint:disable-next-line:radix
              toRemove.push(parseInt(index));
              // tslint:disable-next-line:one-variable-per-declaration
            }
            // tslint:disable-next-line:radix
          }
        }

        clone = clone.filter((event, index) => !toRemove.includes(index));
      }
    }
  }

  private getPreciseInsideEvents(array, event: EventInterface): EventInterface[] {
    // tslint:disable-next-line:max-line-length
    const eventDateStart = this.perfectDate(event.dateStart);
    const eventDateEnd = this.perfectDate(event.dateEnd);

    return array.filter((ev) => {
      const evDateStart = this.perfectDate(ev.dateStart);
      const evDateEnd = this.perfectDate(ev.dateEnd);

      if (ev !== event && ev.resource === event.resource && evDateStart.isBetween(eventDateStart, eventDateEnd, 'minutes', '[)')) {
        if (!this.isSame(ev.dateStart, event.dateStart) || !this.isSame(ev.dateEnd, event.dateEnd)) {
          return evDateStart.isAfter(eventDateStart) || evDateEnd.isBefore(eventDateEnd);
        }
      }
    });
  }

  private getInsideEvents(array, event: EventInterface): EventInterface[] {
    // tslint:disable-next-line:max-line-length
    return array.filter((ev) => ev !== event && ev.resource === event.resource && moment(ev.dateStart).isBetween(moment(event.dateStart), moment(event.dateEnd), 'minutes', '[)'));
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentItem: SimpleChange = changes.referentDate;
    const currentEvents: SimpleChange = changes.events;
    const currentResources: SimpleChange = changes.resources;

    this.loadCalendarData();
  }

  protected capitalize(s) {
    if (typeof s !== 'string') { return ''; }
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  protected loadCalendarData() {
    this.cellRows = [];
    if (this.events && this.resources) {
      this.initializeRows();
      this.defineEventDates(this.events, this.cellRows);
    }
  }
}
