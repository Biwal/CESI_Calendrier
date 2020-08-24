import CellRow from './CellRow';
import {Moment} from 'moment';
import {ConfigInterface, ResourceInterface} from './own-calendar.component';

export interface OwnCalendarTypeInterface {
  name: string;
  generateCellRows(referentDate: Moment, config: ConfigInterface, resources: ResourceInterface[]): CellRow[];
}
