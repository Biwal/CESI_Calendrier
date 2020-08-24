import { Room } from './room';
import { Promotion } from './promotion';
import { Event } from './event';

export class Reservation {
  private id: number;
  private dateStart: Date;
  private dateEnd: Date;
  private room: Room;
  private promotion: Promotion;
  private event: Event;

  constructor(data: any) {
    this.dateEnd = data.dateEnd;
    this.dateStart = data.dateStart;
    this.room = data.room;
    this.id = data.id;
    this.event = data.event;
    this.promotion = data.promotion;
  }

  public get getId(): number {
    return this.id;
  }

  public setId(v: number) {
    this.id = v;
  }

  public get getEvent(): Event{
    return this.event;
  }

  public setEvent(v: Event) {
    this.event = v;
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

  public get getRoom(): Room {
    return this.room;
  }

  public setRoom(v: Room) {
    this.room = v;
  }

  public get getPromotion(): Promotion {
    return this.promotion;
  }

  public setPromotion(v: Promotion) {
    this.promotion = v;
  }

//  public  addPromotion(v: Promotion) {
//     if (!this.promotions.includes(v)) {
//       this.promotions.push(v);
//     }
//     return this.promotions;
//   }

// removePromotion(v: Promotion) {
//     if (this.promotions.includes(v)) {
//       const index = this.promotions.indexOf(v);
//       this.promotions.splice(index, 1);
//     }
//     return this.promotions;
//   }
}
