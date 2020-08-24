import {DayInterface} from '../../components/datepicker/datepicker-day/datepicker-day.component';

export class ClosureDay implements DayInterface {
  private id: number;
  public date: Date;
  public action?: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.date = data.date;
    this.action = data.action;
  }

  public get getId(): number {
    return this.id;
  }

  public setId(v: number) {
    this.id = v;
  }

  public get getDate(): Date {
    return this.date;
  }

  public set setDate(value: Date) {
    this.date = value;
  }
}
