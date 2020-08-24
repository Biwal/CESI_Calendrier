import { Promotion } from './promotion';
import {WeekInterface} from '../../components/datepicker/datepicker-week/datepicker-week.component';

export class PromoScheduler implements WeekInterface {
  private id: number;
  private promotion: Promotion;
  public dateEnd: Date;
  public dateStart: Date;

  constructor(data: any) {
    this.id = data.id;
    this.dateStart = data.dateStart;
    this.dateEnd = data.dateEnd;
    this.promotion = data.promotion;
  }

  public get getId(): number {
    return this.id;
  }

  public setId(v: number) {
    this.id = v;
  }

  public get getDateStart(): Date {
    return this.dateStart;
  }

  public setDateStart(v: Date) {
    this.dateStart = v;
  }

  public get getDateEnd(): Date {
    return this.dateEnd;
  }

  public setDateEnd(v: Date) {
    this.dateEnd = v;
  }

  public get getPromotion(): Promotion {
    return this.promotion;
  }

  public setPromotion(v: Promotion) {
    this.promotion = v;
  }
}
