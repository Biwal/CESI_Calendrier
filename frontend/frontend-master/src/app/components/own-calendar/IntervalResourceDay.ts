import IntervalResource from './IntervalResource';
import CellRow from './CellRow';

export class IntervalResourceDay extends IntervalResource {
  constructor(cellRow: CellRow, resource: string, isHeader: boolean = null) {
    super(cellRow, resource, isHeader, false);
  }
}
