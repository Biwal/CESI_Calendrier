import {Moment} from 'moment';
import IntervalResource from './IntervalResource';

class CellRow {
  get tds(): IntervalResource[] {
    return this._tds;
  }

  set tds(value: IntervalResource[]) {
    this._tds = value;
  }

  private _tds: IntervalResource[];
  private dateStart: Moment;
  private dateEnd: Moment;
  private morning: boolean;

  constructor(dateStart: Moment, dateEnd: Moment, morning: boolean) {
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this._tds = [];
    this.morning = morning;
  }

  getTdWithResource(resource: string) {
    for (const td of this._tds) {
      if (resource === td.getResource()) {
        return td;
      }
    }

    return null;
  }

  getTds() {
    return this._tds;
  }

  getDateStart() {
    return this.dateStart;
  }

  getDateEnd() {
    return this.dateEnd;
  }

  isMorning() {
    return this.morning;
  }
}

export default CellRow;
