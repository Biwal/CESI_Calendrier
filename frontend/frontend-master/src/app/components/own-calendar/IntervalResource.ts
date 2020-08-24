import {EventInterface} from './own-calendar.component';
import CellRow from './CellRow';

export class IntervalResource {
  get title(): string {
    return this._title;
  }
  get isHeader(): boolean {
    return this._isHeader;
  }
  get isHeaderDay(): boolean {
    return this._isHeaderDay;
  }
  private resource: string;
  public events: EventInterface[];
  private _isHeaderDay?: boolean;
  private _isHeader?: boolean;
  private _title: string;
  private _cellRow: CellRow;

  constructor(cellRow: CellRow, resource: string, isHeader: boolean = null, isHeaderDay: boolean = null, title: string = null) {
    this._cellRow = cellRow;
    this.resource = resource;
    this.events = [];
    if (isHeader) this._isHeader = isHeader;
    if (isHeaderDay) this._isHeaderDay = isHeaderDay;
    if (title) this._title = title;
  }

  addEvent(event: EventInterface) {
    this.events.push(event);
  }

  getResource() {
    return this.resource;
  }

  getTimeStart() {
    return this._cellRow.getDateStart().format('HH:mm');
  }

  getTimeEnd() {
    return this._cellRow.getDateEnd().format('HH:mm');
  }
}

export default IntervalResource;
